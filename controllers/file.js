const utils = require('../utils/utils');
const FileModel = require('../models/file');

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

exports.findName = async function(req, res){
  const name = req.query.name;
  try{
    const resultFindName = await FileModel.findOne(
      {
        where: {
          name: name
        }
      }
    );
    if(resultFindName){
      resultFindName.dataValues['serve'] = `${path.join(config.OUTPUT_SERVE, resultFindName.name)}.mp4`
      res.status(200)
          .json(
            {
              status: 200,
              message: null,
              data: resultFindName 
            }
          );
    }else{
      res.status(404)
          .json(
            {
              status: 404,
              message: 'item not found'
            }
          );
    }
  }catch(err){
    res.status(500)
        .json(
          {
            status: 500,
            message: 'Exception retrive name file',
            detail: err
          }
        );
  }
}

exports.list = async function(req, res){
  try{
    console.log(req.userData);
    const resultFiles = await FileModel.findAll({where: {userId: req.userData.id}});
    console.log(resultFiles);
    if(resultFiles.length>0){
      let filesList = [];
      resultFiles.forEach(function(item){
        item.dataValues['serve'] = `${path.join(config.OUTPUT_SERVE, item.name)}.mp4`;
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
      console.log('204');
      res.status(204).json();
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