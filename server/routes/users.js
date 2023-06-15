var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), (req, res, next) => {
	let user = req.oidc.user;
	res.json({
		userProfile: {
			Username: user.nickname,
			Name: user.name,
			Email: user.email,
			Verified: user.email_verified,
			Picture: user.picture,
		},
	});
});

module.exports = router;
