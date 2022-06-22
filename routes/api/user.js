const express = require('express');
const router = express.Router();
const path = require('path');

var authCheck = require('../auth');
var user_controller = require('../../controllers/user');


router.get('/', user_controller.index);
router.get('/list', authCheck.authenticated, user_controller.list);
router.post('/add', user_controller.add);
router.post('/authenticate', user_controller.authenticate);

module.exports = router;