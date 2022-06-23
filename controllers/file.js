const utils = require('../utils/utils');
const FileModel = require('../models/file');
const UserModel = require('../models/user');

const config = require('../config.json');
const path = require('path');

exports.index = function(req, res){
  res.json({status: 200, page: 'index files', from: 'controller file'});
}

exports.create = async function(req, res){
  const origin = req.body.origin;
  const name = utils.md5String(origin.substr(origin.lastIndexOf('/')+1));
  try{
    const resultCreateFile = await FileModel.create({userId: req.userData.id, origin: origin, name: name, status: 'PENDING_DOWNLOAD'});
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
      let filesList = [];
      resultFiles.forEach(function(item){
        item.dataValues['serve'] = `${path.join(config.OUTPUT_SERVE, item.name)}.mp4`;
        console.log(item);
        filesList.push(item);
      });
      res.status(200)
          .json(
            {
              status: 200,
              message: null,
              data: filesList
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