var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var MeSchema = model.BaseSchema.extend({
  title: String,
  about: String,
  contact: [String]
});

module.exports.Me = mongoose.model('Me', MeSchema);
