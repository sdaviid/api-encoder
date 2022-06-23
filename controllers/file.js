const FileModel = require('../models/file');
const UserModel = require('../models/user');

exports.index = function(req, res){
  res.json({status: 200, page: 'index files', from: 'controller file'});
}

exports.create = async function(req, res){
  const origin = req.body.origin;
  try{
    const resultUser = await UserModel.findOne({where: {id: req.userData.id}});
    if(resultUser){
      const resultCreateFile = await FileModel.create({userId: 1, origin: origin, status: '0'});
      if(resultCreateFile){
        res.status(200)
            .json(
              {
                status: 200,
                message: null,
                data: resultCreateFile
              }
            )
      }else{
        res.status(400)
            .json(
              {
                status: 400,
                message: 'failed add file'
              }
            )
      }
    }else{
      res.status(400)
          .json(
            {
              status: 400,
              message: 'could load user data'
            }
          )
    }
  }catch(err){
    res.status(500)
        .json(
          {
            status: 500,
            message: 'Exception add file',
            detail: err
          }
        )
  }
}

exports.list = async function(req, res){
  try{
    const resultFiles = await FileModel.findAll({where: {userId: req.userData.id}});
    if(resultFiles.length>0){
      res.status(200)
          .json(
            {
              status: 200,
              message: null,
              data: resultFiles
            }
          )
    }else{
      res.status(204)
    }
  }catch(err){
    res.status(500)
        .json(
          {
            status: 500,
            message: 'Exception retrive list file',
            detail: err
          }
        )
  }
}