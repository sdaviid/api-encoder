const express = require('express');
const router = express.Router();


var authCheck = require('../auth');
var file_controller = require('../../controllers/file');


const checkRoles = (roles) => {
  return (req, res, next) => {
    if(roles === 'kkkk')
      console.log('kkkkkkkkkkkkkkkkkkkkk')
    next();
  }
}




router.get('/', authCheck.authenticated, file_controller.index);
router.post('/create', authCheck.authenticated, file_controller.create);
router.get('/list', authCheck.authenticated, authCheck.validateRoles(['admin']), file_controller.list);
router.get('/see', authCheck.authenticated, file_controller.findName);

module.exports = router;