var router = require('express').Router();

router.use('/user', require('./api/user'));
router.use('/file', require('./api/file'));

module.exports = router;