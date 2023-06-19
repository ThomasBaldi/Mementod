var router = require('express').Router();

router.get('/profile', (req, res, next) => {
	/* let user = req.oidc.user;
	res.json({
		userProfile: {
			Username: user.nickname,
			Name: user.name,
			Email: user.email,
			Verified: user.email_verified,
			Picture: user.picture,
		},
	}); */
	res.end();
});

module.exports = router;
