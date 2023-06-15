var express = require('express');
var router = express.Router();
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
const { requiresAuth } = require('express-openid-connect');

/* GET all stored images */
router.get('/', requiresAuth(), async (req, res, next) => {
	let user = req.oidc.user;
	var params = {
		Bucket: process.env.S3_BUCKET,
		Key: 'test2',
		Body: 'Hello test mothafucka',
		Delimiter: '/',
		Prefix: user.email + '/',
	};

	console.log(params);

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

/* POST a new image */
router.post('/', requiresAuth(), async (req, res, next) => {
	let user = req.oidc.user;
	var params = {
		Bucket: process.env.S3_BUCKET,
		Key: 'test2',
		Body: 'Hello test mothafucka',
		Delimiter: '/',
		Prefix: user.email + '/',
	};

	console.log(params);

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

	res.end();
});

/* DELETE a specific image */

module.exports = router;
