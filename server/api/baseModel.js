var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var baseSchema = new Schema({
  isDeleted: {'type': Boolean, 'default': false }
});

baseSchema.methods.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports.BaseSchema = baseSchema;
