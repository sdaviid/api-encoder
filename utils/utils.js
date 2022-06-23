const crypto = require('crypto');

exports.md5String = function(string){
  return crypto.createHash('md5').update(string).digest("hex");
}