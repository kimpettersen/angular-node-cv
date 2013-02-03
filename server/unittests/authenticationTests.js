// var assert = require('assert'),
//     should = require('should'),
//     mongoose = require("mongoose"),
//     model = require('../api/auth/model.js'),
//     http = require('request');


// //mocha server/tests --reporter spec -u bdd -r should

// describe('Authentication', function(){
//   var user;

//   beforeEach(function(done){

//     user = new model.UserModel({
//       username: 'kim',
//       password: 'pword'
//     });
//     user.save();
//     done();
//   });

//   afterEach(function(done){
//     User.remove({}, function(){
//       done();
//     });
//   });

//   describe('Login', function(){
//     it('should return status code 204 if the user does not exist', function(done){
//       http({
//         method: 'POST',
//         url: 'http://localhost:3000/auth/login/',
//         json: true,
//         body: JSON.stringify({username: 'unknown', password: 'pword'}) },
//         function(err, res, body){
//           res.statusCode.should.be.equal(204);
//           done();
//         });
//     });

//     it('should return status code 200 if the user exists', function(done){
//       http({
//         method: 'POST',
//         url: 'http://localhost:3000/auth/login/',
//         json: true,
//         body: JSON.stringify({username: 'kim', password: 'pword'}) },
//         function(err, res, body){
//           console.log(body);
//           res.statusCode.should.be.equal(200);
//           done();
//         });
//     });

//   });
// });
