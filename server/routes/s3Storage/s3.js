const {
	S3Client,
	GetObjectCommand,
	ListObjectsCommand,
	PutObjectCommand,
	DeleteObjectCommand,
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
			return Contents; /* .map((image) => {
				image.Key, image.ETag, image.Size, image.Owner;
			}); */
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
};