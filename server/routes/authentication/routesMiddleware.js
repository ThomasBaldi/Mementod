const jsonwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const publicKeyPath = path.join(__dirname, './secretKey.pem');

module.exports = {
	isAuthorized: (req, res, next) => {
		const token = req.headers.authorization.split(' ')[1];
		const publicKey = fs.readFileSync(publicKeyPath);
		const decoded = jsonwt.verify(token, publicKey, { algorithms: [process.env.TOKEN_SIGN] });
		if (decoded.iss === `${process.env.ISSUER_BASED_URL}/`) {
			next();
		} else {
			res.status(401).json({ Message: 'Not Authorized' });
		}
	},
	getTokenData: (req, res, next) => {
		const token = req.headers.authorization.split(' ')[1];
		const publicKey = fs.readFileSync(publicKeyPath);
		const decoded = jsonwt.verify(token, publicKey, { algorithms: [process.env.TOKEN_SIGN] });
		if (!token) {
			res.status(400).json({
				status: 'Failure',
				message: 'Token was not provided.',
			});
		}
		if (decoded) {
			return decoded.sub;
		} else {
			next();
		}
	},
};
