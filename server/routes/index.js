var router = require('express').Router();

router.get('/', (req, res, next) => {
	res.end();
});

module.exports = router;
