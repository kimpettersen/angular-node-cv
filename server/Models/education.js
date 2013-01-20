var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EducationSchema = Schema({
  education: String,
  degree: String
});

module.exports.EducationModel = mongoose.model('EducationModel', EducationSchema);
