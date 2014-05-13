var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var EducationSchema = model.BaseSchema.extend({
  institution: String,
  degree: String,
  description: String,
  order: Number,
  tags: [String]
});

module.exports.Education = mongoose.model('Education', EducationSchema);
