const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jsonwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const publicKeyPath = path.join(__dirname, './secretKey.pem');

module.exports = {
	authMiddleware: jwt({
		secret: jwksRsa.expressJwtSecret({
			cache: true,
			rateLimit: true,
			jwksRequestsPerMinute: 5,
			jwksUri: `${process.env.ISSUER_BASED_URL}.well-known/jwks.json`,
		}),
		audience: `${process.env.ISSUER_BASED_URL}api/v2/`,
		issuer: process.env.ISSUER_BASED_URL,
		algorithms: ['RS256'],
	}),

	verifyToken: (req, res, next) => {
		const token = req.headers.authorization.split(' ')[1];
		const publicKey = fs.readFileSync(publicKeyPath);
		try {
			const decoded = jsonwt.verify(token, publicKey, { algorithms: [process.env.TOKEN_SIGN] });
			// Token is valid
			console.log(decoded);
			next();
		} catch (error) {
			// Token is invalid or expired
			console.log(error);
			next();
		}
	},
};
