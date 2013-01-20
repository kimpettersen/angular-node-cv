var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EducationSchema = Schema({
  university: String,
  degree: String
});

module.exports.Education = mongoose.model('Education', EducationSchema);
