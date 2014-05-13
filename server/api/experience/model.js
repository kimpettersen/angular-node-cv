var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var ExperienceSchema = model.BaseSchema.extend({
  company: String,
  description: String,
  duration: String,
  order: Number,
  tags: [String]
});

module.exports.Experience = mongoose.model('Experience', ExperienceSchema);
