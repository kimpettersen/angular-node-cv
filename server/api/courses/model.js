var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var CourseSchema = model.BaseSchema.extend({
  institution: String,
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  tags: [String]
});

module.exports.Course = mongoose.model('Course', CourseSchema);
