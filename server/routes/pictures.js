const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isAuthorized, getTokenData } = require('./authentication/routesMiddleware');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { uploadToS3, getAllImagesByUser, getImagesBufferName } = require('./s3Storage/s3');

/* GET all user stored images */
router
	.get('/', isAuthorized, async (req, res, next) => {
		const userId = await getTokenData(req);
		let userImages = await getAllImagesByUser(userId);
		var imagesArr = [];
		await Promise.all(
			userImages.map(async (i) => {
				let imageDetails = await getImagesBufferName(i);
				const b64 = Buffer.from(imageDetails.buffer).toString('base64');
				imagesArr.push({
					src: `data:${imageDetails.mimeType};base64, ${b64}`,
					name: imageDetails.name,
				});
			})
		);
		return res.status(201).json(imagesArr);
	})
	/* POST a new image */
	.post('/', isAuthorized, upload.single('file'), async (req, res, next) => {
		const { file } = req;
		const userId = await getTokenData(req);
		if (!file || !userId) {
			return res.status(400).json({ message: 'Bad Request' });
		} else {
			const { err, key } = await uploadToS3({ file, userId });
			if (err) return res.status(500).json({ message: err.message });

			return res.status(201).json({ key });
		}
	})
	/* DELETE a specific image */
	.delete('/', isAuthorized, async (req, res, next) => {
		const picture = req.body.picture;
	});

module.exports = router;
