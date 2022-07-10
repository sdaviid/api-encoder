const express = require('express');
const router = express.Router();


var authCheck = require('../auth');
var file_controller = require('../../controllers/file');




router.post('/create', authCheck.authenticated, authCheck.validateRoles(['admin', 'server']), file_controller.create);
router.get('/list', authCheck.authenticated, authCheck.validateRoles(['admin', 'server', 'user']), file_controller.list);
router.get('/see', authCheck.authenticated, authCheck.validateRoles(['admin', 'server']), file_controller.findName);
router.get('/line', authCheck.authenticated, authCheck.validateRoles(['admin', 'server']), file_controller.line);
router.get('/delete', authCheck.authenticated, authCheck.validateRoles(['admin', 'server']), file_controller.delete);

module.exports = router;