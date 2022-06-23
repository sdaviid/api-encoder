var child_process = require('child_process');

const FileModel = require('../models/file');

var running = false;
var id_doing = false;
var last_message = false;


function handbrake_run(){
  FileModel.findAll({where: {status: '0'}}).then(function(filesStopped){
    if((filesStopped.length>0) && (running === false)){
      var item = filesStopped[0];
      running = true;
      FileModel.update({status: '1'}, {where: {id: item.id}}).then(function(fileStatusUpdate){
        if(fileStatusUpdate){
          id_doing = item.id;
          var origin = item.origin;
          run_script("HandBrakeCLI", ["-i",origin,"-o",origin.replace('mkv', 'mp4')], function(output, exit_code) {
            FileModel.update({status: '2'}, {where: {id: item.id}}).then(function(fileNewStatus){
              running = false;
            });
          });
        }
      })
    }else{
      if(id_doing != false){
        let temp = last_message.substring(last_message.indexOf(',')+1).trim();
        temp = temp.substring(0, temp.indexOf('%')).trim();
        FileModel.update({progress: temp}, {where: {id: id_doing}}).then(function(fileProgressUpdate){
          console.log(fileProgressUpdate);
        })
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

module.exports = handbrake_run;

