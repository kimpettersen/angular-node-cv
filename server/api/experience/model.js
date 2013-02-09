var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var ProjectSchema = model.BaseSchema.extend({
   title: String,
   description: String
});

var ExperienceSchema = model.BaseSchema.extend({
  company: String,
  description: String,
  startDate: String,
  endDate: String,
  projects: [ProjectSchema],
  tags: [String]
});

module.exports.Experience = mongoose.model('Experience', ExperienceSchema);
