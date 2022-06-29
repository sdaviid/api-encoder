const jwt = require('jsonwebtoken');
const config = require('../config.json');


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
    console.log(decoded);
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
    console.log(decoded.aud)
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
      id: decoded.id,
      username: decoded.username,
      name: decoded.name,
      status: decoded.status,
      createdAt: decoded.createdAt,
      updatedAt: decoded.updatedAt
    }
    next();
  });
}