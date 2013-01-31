var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var ProjectSchema = model.BaseSchema.extend({
   title: String,
   duration: String,
   technologies: [String]
});

var ExperienceSchema = model.BaseSchema.extend({
  company: String,
  description: String,
  startDate: Date,
  endDate: Date,
  projects: [ProjectSchema],
  tags: [String]
});

module.exports.Experience = mongoose.model('Experience', ExperienceSchema);
