var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var baseSchema = Schema({
  isDeleted: {'type': Boolean, 'default': false }
});

baseSchema.prototype.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports.BaseSchema = mongoose.model('BaseSchema', baseSchema);
