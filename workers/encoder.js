var child_process = require('child_process');

const FileModel = require('../models/file');

var running = false;
var id_doing = false;
var last_message = false;



module.exports.running = running;
module.exports.id_doing = id_doing;
module.exports.last_message;


class handbrake {
  constructor(){
    this.running = false
    this.id_doing = false
    this.last_message = false
    this.file = FileModel
    this.test = function(){
      console.log('test');
    }
    this.run = function(){
    this.file.findAll({where: {status: '0'}}).then(function(filesStopped){
      if(filesStopped.length>0){
        if(this.running===false){
          var item = filesStopped[0];
          this.running = true;
          FileModel.update({status: '1'}, {where: {id: item.id}}).then(function(fileStatusUpdate){
            if(fileStatusUpdate){
              this.id_doing = item.id;
              var origin = item.origin;
              run_script("HandBrakeCLI", ["-i",origin,"-o",origin.replace('mkv', 'mp4')], function(output, exit_code) {
                FileModel.update({status: '2'}, {where: {id: item.id}}).then(function(fileNewStatus){
                  this.running = false;
                });
              });
            }
          })
        }else{
          console.log(this.running);
          console.log('caiu no else');
          console.log(this.id_doing)
          if(this.id_doing != false){
            if(this.last_message){
              let temp = this.last_message.substring(this.last_message.indexOf(',')+1).trim();
              temp = temp.substring(0, temp.indexOf('%')).trim();
              FileModel.update({percentage: temp}, {where: {id: this.id_doing}}).then(function(filePercentageUpdate){
                console.log(filePercentageUpdate);
              })
            }else{
              console.log('last messsage false');
            }
          }
        }
      }
    });
  }
  this.bora = function(h){setInterval( function() { console.log('rodou handbrake run'); h.run() }, 5000 )};
  }
  
}

module.exports = handbrake;

function run_script(command, args, callback) {
  var child = child_process.spawn(command, args);
  var scriptOutput = "";
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function(data) {
    //calldata = data;
    // last_message = data;
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


// function(){
//   FileModel.findAll({where: {status: '0'}}).then(function(filesStopped){
//     if(filesStopped.length>0){
//       if(running===false){
//         var item = filesStopped[0];
//         running = true;
//         FileModel.update({status: '1'}, {where: {id: item.id}}).then(function(fileStatusUpdate){
//           if(fileStatusUpdate){
//             id_doing = item.id;
//             var origin = item.origin;
//             run_script("HandBrakeCLI", ["-i",origin,"-o",origin.replace('mkv', 'mp4')], function(output, exit_code) {
//               FileModel.update({status: '2'}, {where: {id: item.id}}).then(function(fileNewStatus){
//                 running = false;
//               });
//             });
//           }
//         })
//       }else{
//         console.log('caiu no else');
//         console.log(id_doing)
//         if(id_doing != false){
//           let temp = last_message.substring(last_message.indexOf(',')+1).trim();
//           temp = temp.substring(0, temp.indexOf('%')).trim();
//           FileModel.update({percentage: temp}, {where: {id: id_doing}}).then(function(filePercentageUpdate){
//             console.log(filePercentageUpdate);
//           })
//         }
//       }
//     }
//   });
// }

// exports.handbrakeRun = async function(){
//   const filesStopped = await FileModel.findAll({where: {status: '0'}})
//   if(filesStopped.length>0){
//     if(running==false){
//       var item = filesStopped[0];
//       running = true;
//       const fileStatusUpdate = await FileModel.update({status: '1'}, {where: {id: item.id}})
//       if(fileStatusUpdate){
//         id_doing = item.id;
//         var origin = item.origin;
//         run_script("HandBrakeCLI", ["-i",origin,"-o",origin.replace('mkv', 'mp4')], function(output, exit_code) {
//           const fileNewStatus = await FileModel.update({status: '2'}, {where: {id: item.id}});
//           running = false;
//         }
//       }
//     }else{
//       if(id_doing != false){
//         let temp = last_message.substring(last_message.indexOf(',')+1).trim();
//         temp = temp.substring(0, temp.indexOf('%')).trim();
//         const filePercentageUpdate = await FileModel.update({percentage: temp}, {where: {id: item.id}})
//       }
//     }
//   }
// }

