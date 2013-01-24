var mongoose = require('mongoose');


var Controller = function(){

  var get = function(options, callback){
    var params;
    var Model;

    if(options.hasOwnProperty('model')){
      Model = options.model;
    }else{
      callback({ 'error': 'baseController.get requires a model' }, null);
      return;
    }

    params = options.hasOwnProperty('params') ? options.params : {};

    params.isDeleted = { '$ne': true };

    Model.find(params, function(err, res){
      callback(err, res);
    });
  };

  var post = function(options, callback){
    var params;
    var Model;

    if(options.hasOwnProperty('model')){
      Model = options.model;
    }else{
      callback({ 'error': 'baseController.post requires a model' }, null);
      return;
    }

    params = options.hasOwnProperty('params') ? options.params : {};

    var model = new Model(params);
    model.save();
    callback(null, model);
  };

  var put = function(options, callback){

  };
  var delete_func = function(options, callback){
    var params;
    var Model;

    if(options.hasOwnProperty('model')){
      Model = options.model;
    }else{
      callback({ 'error': 'baseController.delete requires a model' }, null);
      return;
    }

    params = options.hasOwnProperty('params') ? options.params : {};

    Model.findAndModify(params, [], {}, {}, function (err){
      console.log('updated');
    });

    Model.findAndModify(params, function(err, res){
      console.log(res);
      res.isDeleted = true;
      res.save();
      callback(err, res);
    });


  };

  return {
    'get': get,
    'post': post,
    'put': put,
    'delete_func': delete_func

  };
}();

module.exports = Controller;
