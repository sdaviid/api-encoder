var child_process = require('child_process');
const path = require('path');

const FileModel = require('../models/file');

const config = require('../config.json');

var running = false;
var id_doing = false;
var last_message = false;


function axel_run(){
  FileModel.findAll({where: {status: 'PENDING_DOWNLOAD'}}).then(function(filesStopped){
    if((filesStopped.length>0) && (running === false)){
      var item = filesStopped[0];
      running = true;
      FileModel.update({status: 'DOWNLOADING'}, {where: {id: item.id}}).then(function(fileStatusUpdate){
        if(fileStatusUpdate){
          id_doing = item.id;
          var source = item.origin;
          var path_output = `${path.join(config.FOLDER_DOWNLOAD, item.name)}.mkv`;
          console.log(`[AXEL] initiating transfer - ${source} - ${id_doing}`);
          run_script("axel", [source, "-o", path_output], function(output, exit_code){
            FileModel.update({status: 'PENDING_ENCODE'}, {where: {id: item.id}}).then(function(fileNewStatus){
              running = false;
              console.log(`[AXEL] finish transfer - ${source} - ${id_doing}`);
            });
          })
        }
      })
    }else{
      if(id_doing != false){
        let temp = last_message.substring(last_message.indexOf('[ ')+2).trim();
        temp = temp.substring(0, temp.indexOf('%')).trim();
        FileModel.update({progress: temp}, {where: {id: id_doing}});
      }
    }
  });
}


function run_script(command, args, callback) {
  var child = child_process.spawn(command, args);
  var scriptOutput = "";
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function(data) {
    last_message = data;
    data=data.toString();
    scriptOutput+=data;
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function(data) {
    data=data.toString();
    scriptOutput+=data;
  });
  child.on('close', function(code) {
    callback(scriptOutput,code);
  });
}

module.exports = axel_run;