var mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../baseModel.js');

var BucketSchema = model.BaseSchema.extend({
  title: String,
  description: String,
  rating: Number
});

module.exports.BucketList = mongoose.model('BucketList', BucketSchema);
