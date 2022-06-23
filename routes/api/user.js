const express = require('express');
const router = express.Router();


var authCheck = require('../auth');
var user_controller = require('../../controllers/user');


router.get('/', user_controller.index);
router.get('/list', authCheck.authenticated, user_controller.list);
router.post('/add', user_controller.add);
router.post('/authenticate', user_controller.authenticate);
router.get('/me', authCheck.authenticated, user_controller.me);


module.exports = router;