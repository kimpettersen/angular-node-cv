var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var baseSchema = new Schema({
  isDeleted: {'type': Boolean, 'default': false }
});

baseSchema.methods.get = function(options, callback){
  var params = options.hasOwnProperty('params') ? options.params : {};
  params.isDeleted = { '$ne': true };
  callback(null, this);
};

baseSchema.statics.getAll = function(options, callback){
  var params = options.hasOwnProperty('params') ? options.params : {};
  params.isDeleted = { '$ne': true };
  this.find(params, callback);
};

baseSchema.methods.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports.BaseModel = mongoose.model('BaseModel', baseSchema);

