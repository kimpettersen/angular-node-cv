var controller = require('../api/baseController'),
    assert = require('assert'),
    should = require('should'),
    mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../api/baseModel');


mongoose.connect('localhost', 'angularcv_test');
//mocha server/tests --reporter spec -u bdd -r should

describe('BaseModel', function(){
  var model1;
  var model2;

  beforeEach(function(done){

    model1 = new model.BaseModel({});

    model2 = new model.BaseModel({
      isDeleted: true
    });

    model1.save(function(){
      model2.save(function(){
        done();
      });
    });


  });

  afterEach(function(done){
    model.BaseModel.remove({}, function(){
      done();
    });
  });

  describe('get method', function(){

    it('should return all result that matches the parameters and is not deleted', function(done){
      model.BaseModel.get({}, function(err, res){
        should.not.exist(err);
        res.should.not.be.empty;
        for (var i = 0; i < res.length; i++){
          res[i].isDeleted.should.be.equal(false);
        }

        done();
      });
    });

    it('should return one result when an _id that exists is passed', function(done){
      model.BaseModel.get({ '_id': model1._id }, function(err, res){
        should.not.exist(err);
        res[0].isDeleted.should.be.equal(false);
        res.should.have.lengthOf(1);
        done();
      });
    });

    it('should not return anything when an _id to a soft deleted is passed', function(done){
      model.BaseModel.get({ '_id': model2._id }, function(err, res){
        should.not.exist(err);
        res.should.have.lengthOf(0);
        done();
      });
    });
  });

  describe('post method', function(){
    it('Should return "Create a new model with new <ModelName({ params })>"', function(done){
      model.BaseModel.post({}, function(err, res){
        err.should.be.equal('Create a new model with new <ModelName({ params })>');
        res.should.be.equal('Create a new model with new <ModelName({ params })>');
        done();
      });
    });
  });

  describe('put method', function(){
    it('should modify the instance with the given _id with the given parameters', function(done){
      model.BaseModel.put({ '_id': model1._id }, { 'isDeleted': true }, function(err, res){
        should.not.exist(err);
        res.isDeleted.should.be.equal(true);
        done();
      });
    });

    it('should return an error if _id is not passed', function(done){
      model.BaseModel.put({'not-id': model1._id}, {'isDeleted': true }, function(err, res){
        should.exist(err);
        done();
      });
    });
  });

  describe('delete model', function(){
    it('should return an error if _id is not passed', function(done){
      model.BaseModel.put({'not-id': model1._id}, {'isDeleted': true }, function(err, res){
        should.exist(err);
        done();
      });
    });

    it('should soft delete a document with the given _id', function(done){
      model.BaseModel.deleteDocument({'_id': model1._id }, function(err, res){
        should.not.exist(err);
        res.isDeleted.should.be.equal(true);
        model.BaseModel.get({'_id': res._id},function(error, result){
          should.not.exist(error);
          result.should.have.lengthOf(0);
          done();
        });
      });
    });
  });

});
