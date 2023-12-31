const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isAuthorized, getTokenData } = require('./authentication/routesMiddleware');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
	uploadToS3,
	getAllImagesByUser,
	getImagesBufferName,
	deleteImage,
	addAlbum,
	getAllUserFolders,
	getAllImagesByUserAlbum,
	renameImage,
	renameAlbum,
} = require('./s3Storage/s3');

router
	/* GET all users' stored images */
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

	/* GET list of user album folders */
	.get('/albums', isAuthorized, async (req, res, next) => {
		const userId = await getTokenData(req);
		let userAlbums = await getAllUserFolders(userId);
		const albumsWithImages = await Promise.all(
			userAlbums.map(async (album) => {
				const imageDetails = await getImagesBufferName(album.firstObject);
				const b64 = Buffer.from(imageDetails.buffer).toString('base64');
				return {
					...album,
					src: `data:${imageDetails.mimeType};base64, ${b64}`,
				};
			})
		);
		if (userAlbums.length <= 0)
			return res.status(400).json({ message: 'No specific albums available.' });
		else return res.status(201).json(albumsWithImages);
	})

	/* GET all users' stored specific album images */
	.get('/albumImages/:name', isAuthorized, async (req, res, next) => {
		const userId = await getTokenData(req);
		const album = req.params.name;
		let albumImages = await getAllImagesByUserAlbum(userId, album);
		var imagesArr = [];
		await Promise.all(
			albumImages.map(async (i) => {
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

	/* GET users' profile image */
	.get('/profile', isAuthorized, async (req, res, next) => {
		const userId = await getTokenData(req);
		let userImages = await getAllImagesByUser(userId);
		let profilePicture;
		const validProfile = ['profile.jpg', 'profile.png', 'profile.jpeg'];
		await Promise.all(
			userImages.map(async (i) => {
				let name = i.Key.split('%').pop();
				if (validProfile.includes(name)) {
					let imageDetails = await getImagesBufferName(i);
					const b64 = Buffer.from(imageDetails.buffer).toString('base64');
					profilePicture = {
						src: `data:${imageDetails.mimeType};base64, ${b64}`,
						name: imageDetails.name,
					};
				}
			})
		);
		return res.status(201).json(profilePicture);
	})
	/* POST a new image */
	.post('/', isAuthorized, upload.single('file'), async (req, res, next) => {
		const { file } = req;
		const userId = await getTokenData(req);
		const album = req.body.album;

		if (!file || !userId) {
			return res.status(400).json({ message: 'Bad Request' });
		} else if (!album || album === '') {
			const { err, key } = await uploadToS3({ file, userId });
			if (err) return res.status(500).json({ message: err.message });

			return res.status(201).json({ key });
		} else {
			const { err, key } = await addAlbum({ file, album, userId });
			if (err) return res.status(500).json({ message: err.message });

			return res.status(201).json({ key });
		}
	})
	/* POST new name to already stored picture */
	.post('/renamePicture', isAuthorized, async (req, res, next) => {
		const oldName = req.body.oldFileName;
		const newName = req.body.newFileName;
		const userId = await getTokenData(req);

		let userImages = await getAllImagesByUser(userId);

		await Promise.all(
			userImages.map(async (i) => {
				let name = i.Key.split('%').pop();
				if (oldName.includes(name)) {
					let oldPicture = i.Key;
					if (oldName && newName && userId) {
						await renameImage({ userId, oldPicture, newName });
						return res.status(201).json({ message: 'Renamed successfully!' });
					} else {
						return res.status(400).json({ message: 'Bad Request' });
					}
				}
			})
		);
	})
	/* POST new name to already stored album */
	.post('/renameAlbum', isAuthorized, async (req, res, next) => {
		const oldAlbum = req.body.oldAlbumName;
		const newAlbum = req.body.newAlbumName;
		const userId = await getTokenData(req);

		let albumImages = await getAllImagesByUserAlbum(userId, oldAlbum);

		await Promise.all(
			albumImages.map(async (i) => {
				if (!oldAlbum && !newAlbum && !userId) {
					return res.status(400).json({ message: 'Bad Request' });
				} else if (albumImages.length <= 0) {
					return;
				} else {
					await renameAlbum(userId, i.Key, newAlbum);
				}
			})
		).then(() => {
			return res.status(201).json({ message: 'Renamed successfully!' });
		});
	})
	/* DELETE a specific image */
	.delete('/:name', isAuthorized, async (req, res, next) => {
		const image = req.params.name;
		const userId = await getTokenData(req);
		let userImages = await getAllImagesByUser(userId);
		if (userImages) {
			const imageForDeletion = userImages.find((obj) => obj.Key.endsWith(`%${image}`));
			if (imageForDeletion) await deleteImage(imageForDeletion.Key);
			return res.status(201).json({ message: `Successfully deleted ${image}.` });
		} else {
			return;
		}
	});

module.exports = router;
