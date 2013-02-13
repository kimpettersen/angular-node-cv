var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var ExperienceSchema = model.BaseSchema.extend({
  company: String,
  description: String,
  startDate: String,
  endDate: String,
  tags: [String]
});

module.exports.Experience = mongoose.model('Experience', ExperienceSchema);
