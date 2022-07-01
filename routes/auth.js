const jwt = require('jsonwebtoken');
const config = require('../config.json');

exports.validateRoles = (roles) => {
  return (req, res, next) => {
    const token = req.headers['token'];
    jwt.verify(token, config.secret, function(err, decoded){
      let go = false;
      roles.forEach(function(item, index){
        if(decoded.role.includes(item)){
          console.log('go');
          go = true;
        }
      });
      if(go){
        next();
      }else{
        return res
              .status(403)
              .json(
                {
                  status: 403,
                  message: 'Not permitted'
                }
              );
      }
    })
  }
}


exports.authenticated = function(req, res, next){
  const token = req.headers['token'];
  if(!token){
    return res
        .status(401)
        .json(
          {
            status: 401,
            message: 'Invalid token'
          }
        );
  }
  jwt.verify(token, config.secret, function(err, decoded){
    if(err){
      return res
            .status(500)
            .json(
              {
                  status: 500,
                  message: err.name
              }
            );
    }
    if(decoded.aud != 'cli-web-encoder'){
      return res
              .status(403)
              .json(
                {
                  status: 403,
                  message: 'Not allowed'
                }
              )
    }
    req.userData = {
      id: decoded.sub
    }
    next();
  });
}