// var controller = require('../api/baseController'),
//     assert = require('assert'),
//     should = require('should'),
//     mongoose = require("mongoose");


// // mongoose.connect('localhost', 'angularcv_tests');
// //mocha server/tests --reporter spec -u bdd -r should

// var testSchema = new mongoose.Schema({
//   fakeValue: String,
//   fakeID: Number,
//   isDeleted: Boolean
// });

// var testModel = mongoose.model('testSchema', testSchema);

// describe('baseController', function(){
//   var model1;
//   var model2;
//   var model3;

//   beforeEach(function(done){

//     model1 = new testModel({
//       fakeValue: 'model1',
//       fakeID: 1
//     });

//     model2 = new testModel({
//       fakeValue: 'model2',
//       fakeID: 2
//     });

//     model3 = new testModel({
//       fakeValue: 'model3',
//       fakeID: 3,
//       isDeleted: true
//     });

//     model1.save();
//     model2.save();
//     model3.save();
//     done();
//   });

//   afterEach(function(done){
//     testModel.remove({}, function(){
//       done();
//     });
//   });

//   describe('GET model', function(){
//     it('should return all results in the model when id is not defined', function(done){
//       controller.get({ 'model': testModel }, function(err, res){
//         res.should.have.lengthOf(2);
//         done();
//       });
//     });

//     it('should not return any results marked with isDeleted = true', function(done){
//       controller.get({ 'model': testModel }, function(err, res){
//         for(var i = 0; i < res.length; i++){
//           if(res[i].hasOwnProperty('isDeleted')){
//             res[i].isDeleted.should.be('true');
//           }
//         }
//         done();
//       });
//     });

//     it('Should not return a single result when isDeleted = true', function(done){
//       controller.get({ 'model': testModel, 'params': { 'fakeID': 3 } }, function(err, res){
//         res.should.be.empty;
//         done();
//       });
//     });

//     it('should return one result when id is defined', function(done){
//       controller.get({ 'model': testModel, 'params': { 'fakeID': 1 } }, function(err, res){
//         res.should.have.lengthOf(1);
//         done();
//       });
//     });

//     it('should return data with the right properties', function(done){
//       controller.get({ 'model': testModel, 'params': { 'fakeID': 2 } }, function(err, res){
//         res[0].fakeID.should.be.equal(2);
//         res[0].fakeValue.should.be.equal('model2');
//         done();
//       });
//     });

//     it('should not return an error if wrong parameters are past', function(done){
//       controller.get({ 'model': testModel }, function(err, res){
//         should.not.exist(err);
//         done();
//       });
//     });

//     it('should return an error if no model are passed', function(done){
//       controller.get({}, function(err, res){
//         should.exist(err);
//         err.error.should.be.equal('baseController.get requires a model');
//         done();
//       });
//     });
//   });

//   describe('POST model', function(){
//     it('should return a new model with the properties passed', function(done){
//       var model4 = {
//         fakeValue: 'model4',
//         fakeID: 4
//       };

//       controller.post({ 'model': testModel, params: model4 }, function(err, res){
//         res.fakeValue.should.be.equal('model4');
//         res.fakeID.should.be.equal(4);
//         done();
//       });
//     });

//     it('should not return an error if wrong parameters are past', function(done){
//       var model4 = {
//         fakeValue: 'model4',
//         fakeID: 4
//       };

//       controller.post({ 'model': testModel, params: model4 }, function(err, res){
//         should.not.exist(err);
//         done();
//       });
//     });

//     it('should return an error if no model are passed', function(done){
//       controller.post({}, function(err, res){
//         should.exist(err);
//         err.error.should.be.equal('baseController.post requires a model');
//         done();
//       });
//     });
//   });

//   describe('PUT model', function(){

//   });

//   describe('DELETE model', function(){
//     it('should soft delete a model by setting isDeleted to true', function(done){
//       controller.delete_func({ 'model': testModel, params: { 'fakeID': 1 } }, function(err, res){
//         res.isDeleted.should.be.equal(true);
//         done();
//       });
//     });
//   });


// });
