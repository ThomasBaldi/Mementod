const {
	S3Client,
	GetObjectCommand,
	ListObjectsCommand,
	PutObjectCommand,
	DeleteObjectCommand,
	CopyObjectCommand,
} = require('@aws-sdk/client-s3');

const s3 = new S3Client({
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET,
	},
});
const BUCKET = process.env.S3_BUCKET;
const { v4: uuidv4 } = require('uuid');

module.exports = {
	//pictures
	uploadToS3: async ({ file, userId }) => {
		const key = `${userId}/${uuidv4()}%${file.originalname}`;
		const command = new PutObjectCommand({
			Bucket: BUCKET,
			Key: key,
			Body: file.buffer,
			ContentType: file.mimetype,
		});

		try {
			await s3.send(command);
			return { key };
		} catch (err) {
			console.log(err);
			return { err };
		}
	},

	getAllImagesByUser: async (userId) => {
		const command = new ListObjectsCommand({
			Bucket: BUCKET,
			Prefix: userId,
		});

		try {
			const { Contents = [] } = await s3.send(command);
			return Contents;
		} catch (err) {
			console.log(err);
			return { err };
		}
	},

	getImagesBufferName: async (imageObj) => {
		const command = new GetObjectCommand({
			Bucket: BUCKET,
			Key: imageObj.Key,
		});

		try {
			const res = await s3.send(command);

			const chunks = [];
			res.Body.on('data', (chunk) => chunks.push(chunk));

			return new Promise((resolve, reject) => {
				res.Body.on('end', () => {
					const buffer = Buffer.concat(chunks);
					const name = imageObj.Key.split('%').pop();
					const mimeType = res.ContentType;
					resolve({ buffer, name, mimeType });
				});

				res.Body.on('error', (err) => {
					console.error('Error retrieving image: ', err);
					reject(err);
				});
			});
		} catch (err) {
			console.error('Error retrieving image: ', err);
			throw err;
		}
	},

	deleteImage: async (imageKey) => {
		const command = new DeleteObjectCommand({
			Bucket: BUCKET,
			Key: imageKey,
		});

		try {
			await s3.send(command);
			return console.log('Image removed from your cloud storage.');
		} catch (err) {
			console.log(err);
			return err;
		}
	},

	renameImage: async ({ userId, oldPicture, newName }) => {
		//create new name with filte type at the end
		const fileName = oldPicture.split('.');
		const fileExtension = fileName.pop();
		const newKey = `${newName}.${fileExtension}`;

		//for encoding issues derived by special characters
		const encodedOldName = encodeURIComponent(oldPicture);

		//extract album name
		const pattern = /_([^/]+)\//;
		const matches = oldPicture.match(pattern);
		let album;

		if (matches && matches.length > 1) {
			album = matches[1];
		} else if (matches && matches.length > 1 && matches[1] === undefined) {
			album = 'Album';
		}

		const copyCommand = new CopyObjectCommand({
			Bucket: BUCKET,
			CopySource: BUCKET + '/' + encodedOldName,
			Key: `${userId}_${album}/${uuidv4()}%${newKey}`,
		});
		try {
			await s3
				.send(copyCommand)
				.then(() => {
					console.log(
						`Object with name ${oldPicture} was successfully copied and renamed ${newName}.`
					);
				})
				.then(async () => {
					const deleteCommand = new DeleteObjectCommand({
						Bucket: BUCKET,
						Key: oldPicture,
					});
					await s3.send(deleteCommand);
				})
				.then(() => {
					console.log(`Object with name ${oldPicture} was deleted.`);
				});
		} catch (err) {
			console.log(err);
			return err;
		}
	},

	//albums
	addAlbum: async ({ file, album, userId }) => {
		const key = `${userId}_${album}/${uuidv4()}%${file.originalname}`;
		const command = new PutObjectCommand({
			Bucket: BUCKET,
			Key: key,
			Body: file.buffer,
			ContentType: file.mimetype,
		});

		try {
			await s3.send(command);
			return { key };
		} catch (err) {
			console.log(err);
			return { err };
		}
	},

	getAllImagesByUserAlbum: async (userId, album) => {
		const command = new ListObjectsCommand({
			Bucket: BUCKET,
			Prefix: `${userId}_${album}`,
		});

		try {
			const { Contents = [] } = await s3.send(command);
			return Contents;
		} catch (err) {
			console.log(err);
			return { err };
		}
	},

	//bucket prefixes
	getAllUserFolders: async (userId) => {
		const command = new ListObjectsCommand({
			Bucket: BUCKET,
			Delimiter: '/',
			Prefix: `${userId}_`,
		});

		try {
			const albumsData = []; // Initialize an array to store album data

			const response = await s3.send(command);
			const matchingPrefixes = response.CommonPrefixes.map((prefix) => prefix.Prefix);

			for (const prefix of matchingPrefixes) {
				const folderName = prefix.replace(`${userId}_`, '').replace('/', '');

				// List objects in the current folder
				const objectsCommand = new ListObjectsCommand({
					Bucket: BUCKET,
					Prefix: prefix,
				});

				const objectsResponse = await s3.send(objectsCommand);
				const firstObject = objectsResponse.Contents[0]; // Get the first object in the folder

				albumsData.push({ folderName, firstObject });
			}
			return albumsData;
		} catch (err) {
			console.log(err);
			return { err };
		}
	},
};
