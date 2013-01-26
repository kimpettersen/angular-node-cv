var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var Schema = mongoose.Schema;

var EducationSchema = model.BaseSchema.extend({
  institution: String,
  degree: String,
  startDate: Date,
  endDate: Date,
  description: String,
  tags: [String]
});

module.exports.Education = mongoose.model('Education', EducationSchema);
