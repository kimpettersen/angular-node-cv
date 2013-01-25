var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var Schema = mongoose.Schema;

var EducationSchema = model.BaseSchema.extend({
  university: String,
  degree: String
});

module.exports.Education = mongoose.model('Education', EducationSchema);
