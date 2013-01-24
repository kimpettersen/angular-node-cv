var controller = require('../api/baseController'),
    assert = require('assert'),
    should = require('should'),
    mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../api/baseModel');


mongoose.connect('localhost', 'angularcv_tests');
//mocha server/tests --reporter spec -u bdd -r should

describe('BaseModel', function(){
  var model1;
  var model2;

  beforeEach(function(done){

    model1 = new model.BaseModel({});

    model2 = new model.BaseModel({
      isDeleted: true
    });

    model1.save();
    model2.save();
    done();
  });

  afterEach(function(done){
    model.BaseModel.remove({}, function(){
      done();
    });
  });

  describe('GET model', function(){
    it('should return all result that matches the parameters and is not deleted', function(done){
      model.BaseModel.get({}, function(err, res){
        res.should.have.lengthOf(1);
        done();
      });
    });
  });

  describe('POST model', function(){

  });

  describe('PUT model', function(){

  });

  describe('DELETE model', function(){

  });

});
