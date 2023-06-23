const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isAuthorized, getTokenData } = require('./authentication/routesMiddleware');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { uploadToS3 } = require('./s3Storage/s3');

/* GET all users stored images */
router.get('/', async (req, res, next) => {
	const user = req.user;
	console.log(user);
	res.json({ user: user });
});

/* GET a specific stored image */

/* POST a new image */
router.post('/', isAuthorized, upload.single('file'), async (req, res, next) => {
	const { file } = req;
	const userId = getTokenData(req);
	console.log({ user: userId, file: file });
	if (userId) {
		res.status(200);
	} else {
		res.end();
	}

	if (!file || !userId) {
		return res.status(400).json({ message: 'Bad Request' });
	} else {
		const { err, key } = uploadToS3({ file, userId });
		if (err) return res.status(500).json({ message: err.message });

		return res.status(201).json({ key });
	}
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
});

/* DELETE a specific image */

module.exports = router;
