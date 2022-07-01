var router = require('express').Router();

router.use('/file', require('./api/file'));

module.exports = router;