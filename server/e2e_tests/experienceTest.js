var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    model = require('../api/experience/model.js');

var referenceId;
var ex;

describe('Restricted access and status codes', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();


  beforeEach(function(done){
    ex = model.Experience();
    referenceId = ex._id;
    ex.save();

    auth_req.post('localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        done();
    });


  });

  afterEach(function(done){
    model.Experience.remove({}, function(){
      done();
    });
  });


  describe('GET experience', function(){
    it('should return 200 when getting all experience', function(done){
      auth_req
        .get('localhost:3000/api/experience')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one experience', function(done){
      auth_req
        .get('localhost:3000/api/experience/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all experience when unauthenticated', function(done){
      auth_req
        .get('localhost:3000/api/experience')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one experience when unauthenticated', function(done){
      auth_req
        .get('localhost:3000/api/experience/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });


  });

  describe('POST experience', function(){

    it('should return 201 when creating a new experience', function(done){
      auth_req
        .post('localhost:3000/api/experience/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new experience when not authenticated', function(done){
      unauth_req
        .post('localhost:3000/api/experience/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          should.exist(res.headers['set-cookie']);
          done();
        });
    });

  });

  describe('PUT experience', function(){
    it('should return 201 when authenticated', function(done){
      auth_req
        .put('localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new experience when not authenticated', function(done){
      unauth_req
        .put('localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });

  describe('DELETE experience', function(){
    it('Should return 200 when authenticated', function(done){
      auth_req
        .del('localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(200);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('Should return 403 when not authenticated', function(done){
      unauth_req
        .del('localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });
});
