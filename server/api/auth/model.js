var mongoose = require("mongoose"),

    extend = require('mongoose-schema-extend'),
    model = require('../api/baseModel.js');

var UserSchema = model.BaseSchema.extend({
  username: String,
  password: String
});

UserModel = mongoose.model('UserModel', UserSchema);

module.exports.UserSchema = UserSchema;
module.esports.UserModel = UserModel;