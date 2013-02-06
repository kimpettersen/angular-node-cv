var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    model = require('../api/user/model.js');

var referenceId;
var user;

describe('Restricted access and status codes', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();


  beforeEach(function(done){
    user = model.UserModel();
    referenceId = user._id;
    user.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        done();
    });


  });

  afterEach(function(done){
    model.UserModel.remove({}, function(){
      done();
    });
  });


  describe('GET user', function(){
    it('should return 200 when getting all bucket list', function(done){
      auth_req
        .get('http://localhost:3000/api/user')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one user', function(done){
      auth_req
        .get('http://localhost:3000/api/user/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all bucket list when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/user')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one user when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/user/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });


  });

  describe('POST user', function(){

    it('should return 201 when creating a new user', function(done){
      auth_req
        .post('http://localhost:3000/api/user/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new user when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/user/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          should.exist(res.headers['set-cookie']);
          done();
        });
    });

  });

  describe('PUT user', function(){
    it('should return 201 when authenticated', function(done){
      auth_req
        .put('http://localhost:3000/api/user/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new user when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/user/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });

  describe('DELETE user', function(){
    it('Should return 200 when authenticated', function(done){
      auth_req
        .del('http://localhost:3000/api/user/' + referenceId)
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
        .del('http://localhost:3000/api/user/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });
});
