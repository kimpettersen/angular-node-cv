var mongoose = require ('mongoose');

module.exports.db = mongoose.connect('localhost', 'angularcv');

// mongoose.connect('mongodb://kimpettersen:77yjhw4@ds047427.mongolab.com:47427/cv');
