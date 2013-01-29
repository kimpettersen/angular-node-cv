var assert = require('assert'),
    should = require('should'),
    mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    auth = require('../auth/authenticate.js'),
    http = require('request');

mongoose.connect('localhost', 'angularcv_tests');
//mocha server/tests --reporter spec -u bdd -r should

describe('Authentication', function(){
  var user;

  beforeEach(function(done){
    user = new auth.UserModel({
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
    it('should return "User not found" if the user does not exist', function(){
      http({
        method: 'POST',
        url: '/auth/login/',
        json: true,
        body: JSON.stringify({username: 'unknown', password: 'pword'}) },
        function(err, res, body){
          res.statusCode.should.be.equal(204);
          console.log(body);
        });
    });

  });
});
