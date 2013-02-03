var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var UserSchema = model.BaseSchema.extend({
  username: String,
  password: String
});

UserModel = mongoose.model('UserModel', UserSchema);

module.exports.UserModel = UserModel;
