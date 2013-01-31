var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var MeSchema = model.BaseSchema.extend({
  description: String,
  contact: [String],
  photo: String
});

module.exports.Me = mongoose.model('Me', MeSchema);
