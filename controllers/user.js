const jwt = require('jsonwebtoken');
const config = require('../config.json');
const UserModel = require('../models/user');

exports.index = function(req, res) {
  res.json({status: 200, page: 'index /', from: 'controller'})
};


exports.list = function(req, res) {
  res.json({status: 200, page: 'list /', from: 'controller'})
};


exports.add = async function(req, res){
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  try{
    const resultAddUser = await UserModel.create({username: username, password: password, name: name});
    if(resultAddUser){
      res.status(200)
          .json(
            {
              status: 200,
              message: null,
              data: resultAddUser
            }
          );
    }else{
      res.status(400)
          .json(
            {
              status: 400,
              message: 'failed add user'
            }
          );
    }
  }catch(err){
    res.status(500)
        .json(
          {
            status: 500,
            message: 'Exception add user',
            detail: err
          }
        );
  }
}

exports.authenticate = async function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  try{
    const resultUser = await UserModel.findOne({where: {username: username, password: password}});
    if(resultUser){
      const token = jwt.sign(
                              {
                                id: resultUser.id,
                                username: resultUser.username,
                                name: resultUser.name,
                                status: resultUser.status,
                                createdAt: resultUser.createdAt,
                                updatedAt: resultUser.updatedAt
                              },
        config.secret,
        {
          expiresIn: 300
        }
      );
      res.status(200)
        .json(
          {
            status: 200,
            message: null,
            token: token
          }
        )
    }else{
      res.status(400)
        .json(
          {
            status: 400,
            message: 'failed authenticate user'
          }
        );
    }
  }catch(err){
    res.status(500)
      .json(
        {
          status: 500,
          message: 'Exception authenticate user',
          detail: err
        }
      );
  }
}


exports.me = function(req, res){
  res.status(200)
      .json(
        {
          status: 200,
          message: null,
          data: {
            id: req.userData.id,
            username: req.userData.username,
            name: req.userData.name,
            status: req.userData.status,
            createdAt: req.userData.createdAt,
            updatedAt: req.userData.updatedAt
          }
        }
      );
}