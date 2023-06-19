const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

/* GET all users stored images */
router.get('/', async (req, res, next) => {
	let user = req.oidc.user;
	var params = {
		Bucket: process.env.S3_BUCKET,
		Key: 'test2',
		Body: 'Hello test mothafucka',
		Delimiter: '/',
		Prefix: user.email + '/',
	};

	try {
		const results = await s3.send(
			new PutObjectCommand({
				Body: params.Body,
				Bucket: params.Bucket,
				Key: params.Key,
			})
		);
		console.log(results);
	} catch (error) {
		console.log(error);
	}
	/* var allObjects = await s3.listObjects(params).promise(); */
	/* var keys = allObjects?.Contents.map((x) => x.Key);
	 */
	/* const pictures = await Promise.all(
		keys.map(async (key) => {
			let my_file = await s3
				.getObject({
					Bucket: process.env.BUCKET_NAME,
					Key: key,
				})
				.promise();
			return {
				src: Buffer.from(my_file.Body).toString('base64'),
				name: key.split('/').pop(),
			};
		})
	);
	res.render('pictures', { pictures: pictures });  */
	res.end();
});

/* GET a specific stored image */

/* function to upload file and returng a promise */
/* const uploadFile = async (buffer, name, type) => {
	const params = {
		Bucket: process.env.S3_BUCKET,
		Key: req.oidc.user.email + '/' + name + type.ext,
		Body: buffer,
		ContentType: type.mime,
		Delimiter: '/',
		Prefix: req.oidc.user.email + '/',
	};
	return s3.send(new PutObjectCommand(params).promise());
}; */
/* POST a new image */
router.post('/', upload.single('file'), async (req, res, next) => {
	const { file } = req;
	let user = req.oidc.user;
	console.log(file);

	if (!file || !user) return res.status(400).json({ message: 'Bad Request' });
	/* form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(500).send(err);
		}
		try {
			const path = files.file[0].path;
			const buffer = fs.readFileSync(path);
			const type = await FileType.fileTypeFromBuffer(buffer);
			const name = `bucketFolder/${(Date, now().toString())}`;
			const data = await uploadFile(buffer, name, type);
			return res.status(200).send(data);
		} catch (err) {
			return res.status(500).send(err);
		}
	}); */

	/* 	try {
		const results = await s3.send(
			new PutObjectCommand({
				Body: params.Body,
				Bucket: params.Bucket,
				Key: params.Key,
			})
		);
		console.log(results);
	} catch (error) {
		console.log(error);
	} */
	res.end();
});

/* DELETE a specific image */

module.exports = router;
