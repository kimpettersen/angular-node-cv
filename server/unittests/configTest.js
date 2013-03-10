var assert = require('assert'),
    should = require('should'),
    mongoose = require("mongoose"),
    bucketModel = require('../api/bucketList/model.js'),
    educationModel = require('../api/education/model.js'),
    experienceModel = require('../api/experience/model.js'),
    meModel = require('../api/me/model.js'),
    userModel = require('../api/user/model.js');



describe('Config file', function(){
  describe('setting up test database', function(){
    it('should have a initial non duplicate bucketlist elems', function(done){
      bucketModel.BucketList.get({}, function(err, res){
        should.not.exist(err);
        res.length.should.be.equal(1);
        res[0].title.should.include('bucket title');
        res[0].description.should.include('bucket description');
        res[0].rating.should.be.equal(1);
        done();
      });
    });

    it('should have a initial non duplicate education elems', function(done){
      educationModel.Education.get({}, function(err, res){
        should.not.exist(err);
        res.length.should.be.equal(1);
        res[0].institution.should.include('edu institution');
        res[0].degree.should.include('edu degree');
        res[0].description.should.include('edu description');
        res[0].tags.should.contain('edu tag1', 'edu tag2');
        done();
      });
    });

    it('should have a initial non duplicate experience elems', function(done){
      experienceModel.Experience.get({}, function(err, res){
        should.not.exist(err);
        res.length.should.be.equal(1);
        res[0].company.should.include('exp company');
        res[0].description.should.include('exp description');
        res[0].duration.should.include('exp duration');
        res[0].tags.should.contain('exp tag1', 'exp tag2');
        done();
      });
    });

    it('should have a initial non duplicate me elems', function(done){
      meModel.Me.get({}, function(err, res){
        should.not.exist(err);
        res.length.should.be.equal(1);
        res[0].title.should.include('me title');
        res[0].description.should.include('me description');
        res[0].tags.should.contain('me tag1', 'me tag2');
        done();
      });
    });

    it('should have a initial non duplicate user elems', function(done){
      userModel.UserModel.get({}, function(err, res){
        should.not.exist(err);
        res.length.should.be.equal(1);
        res[0].username.should.be.equal('admin');
        res[0].password.should.be.equal('1234');
        done();
      });
    });
  });
});
