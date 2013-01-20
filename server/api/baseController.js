var mongoose = require('mongoose');

module.exports.get = function(data, callback){
  var result = [];
  var args = data.id ? {'_id': data.id} : {}

  data.model.find(args, function(err, res){
    if(err){
      console.log('Error: ', err);
      result.push({ 'error': 'Problems retrieving model' });
    }else{
      result = res;
    }
    callback(result)
  });
}

module.exports.post = function(model){

}

module.exports.put = function(model){

}

module.exports.delete = function(model){

}
