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
		const key = `${userId}/${uuidv4()}`;
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
};
