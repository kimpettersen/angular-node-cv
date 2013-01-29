var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BaseSchema = new Schema({
  isDeleted: {'type': Boolean, 'default': false }
});

BaseSchema.statics.get = function(args, callback){
  args = Object.prototype.toString.call(args) === '[object Object]' ? args : {};
  args.isDeleted = { '$ne': true };
  this.find(args, function(err, res){
    callback(err, res);
  });
};

BaseSchema.statics.post = function(params, callback){
  //Post to follow convention. might be dropped.
  callback('Create a new model with new <ModelName({ params })>', 'Create a new model with new <ModelName({ params })>');
};

BaseSchema.statics.put = function(args, update, callback){
  var query;

  if(!args.hasOwnProperty('_id')){
    callback(new Error('_id not defined'));
    return;
  }

  query = { '_id': args._id };

  this.findOne(query, function(err, res){
    for(var prop in update){
      if(update.hasOwnProperty(prop)){
        res[prop] = update[prop];
      }
    }
    res.save();
    callback(err, res);
  });
};

BaseSchema.statics.deleteDocument = function(args, callback){
  if(!args.hasOwnProperty('_id')){
    callback(new Error('_id not defined'));
    return;
  }
  this.findOne(args, function(err, res){
    res.isDeleted = true;
    res.save();
    callback(err, res);
  });
};

var BaseModel = mongoose.model('BaseSchema', BaseSchema);


module.exports.BaseSchema = BaseSchema;
module.exports.BaseModel = BaseModel;
