const express = require('express');
const router = express.Router();
const path = require('path');

var authCheck = require('../auth');
var file_controller = require('../../controllers/file');


router.get('/', authCheck.authenticated, file_controller.index);
router.post('/create', authCheck.authenticated, file_controller.create);
router.get('/list', authCheck.authenticated, file_controller.list);

module.exports = router;