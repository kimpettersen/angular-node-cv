var assert = require('assert'),
    should = require('should'),
    mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    auth = require('../auth/authenticate'),
    http = require('request'),
    model = require('../api/baseModel');


mongoose.connect('localhost', 'angularcv_tests');
//mocha server/tests --reporter spec -u bdd -r should

describe('Authentication', function(){
  var user;

  var UserSchema = model.BaseSchema.extend({
    username: String,
    password: String
  });
  User = mongoose.model('UserSchema', UserSchema);



  beforeEach(function(done){
    user = new User({
      username: 'kim',
      password: 'pword'
    });
    user.save();

    done();
  });

  afterEach(function(done){
    User.remove({}, function(){
      done();
    });
  });

  describe('Login', function(){
    it('should return "User not found" if the user does not exist', )

  });
});
