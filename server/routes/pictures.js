const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authMiddleware, verifyToken } = require('./authentication/routesMiddleware');

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
router.get('/', verifyToken, authMiddleware, async (req, res, next) => {
	const user = req.user;
	console.log(user);
	res.json({ user: user });
});

/* GET a specific stored image */

/* POST a new image */
router.post('/', authMiddleware, verifyToken, upload.single('file'), async (req, res, next) => {
	const { file } = req;
	console.log(file);
	return console.log(req.user);

	/* const user = req.user;
	console.log(user); */

	/* if (!file || !user) return res.status(400).json({ message: 'Bad Request' }); */
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
	next();
});

/* DELETE a specific image */

module.exports = router;
