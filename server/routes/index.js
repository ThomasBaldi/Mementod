var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', (req, res, next) => {
	res.json({
		title: 'Welcome to Mementod!',
		isAuthenticated: req.oidc.isAuthenticated(),
	});
});

module.exports = router;
