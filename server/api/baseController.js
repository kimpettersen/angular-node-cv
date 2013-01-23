var mongoose = require('mongoose');

var Controller = function(){

  var get = function(options, callback){
    var params;
    var Model;

    if(options.hasOwnProperty('model')){
      Model = options.model;
      console.log('Passed!');
    }else{
      console.log('In callback');
      callback({ 'error': 'baseController.get requires a model' }, {});
      return;
    }

    options.hasOwnProperty('params') ? params = options.params : params = {}

    Model.find(params, function(err, res){
      callback(err, res)
    });
  }

  var post = function(options, callback){
    var params;
    var Model;

    if(options.hasOwnProperty('model')){
      Model = options.model;
    }else{
      callback({ 'error': 'baseController.post requires a model' }, {});
      return;
    }

    options.hasOwnProperty('params') ? params = options.params : params = {}


    var model = new Model(params)
    model.save();
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

