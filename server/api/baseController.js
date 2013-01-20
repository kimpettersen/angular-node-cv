var mongoose = require('mongoose');

var Controller = function(){

  var get = function(Model, param, callback){
    //TODO: variable validation

    Model.find(param, function(err, res){
      callback(err, res)
    });
  }

  var post = function(Model, param, callback){
    var model = new Model(param)
    callback(model);
  };

  var put = function(data, callback){};
  var delete_func = function(data, callback){};

  return {
    'get': get,
    'post': post,
    'put': put,
    'delete': delete_func

  }
}();

module.exports = Controller;



// module.exports.get = function(data, callback){
//   var result = [];
//   var args = data.id ? {'_id': data.id} : {}

//   data.model.find(args, function(err, res){
//     if(err){
//       console.log('Error: ', err);
//       result.push({ 'error': 'Problems retrieving model' });
//     }else{
//       result = res;
//     }
//     callback(result)
//   });
// }

// module.exports.post = function(model){

// }

// module.exports.put = function(model){

// }

// module.exports.delete = function(model){

// }

