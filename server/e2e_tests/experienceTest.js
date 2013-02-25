var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    model = require('../api/experience/model.js');

var referenceId;
var ex;

describe('Restricted access and status codes', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();


  before(function(done){
    ex = new model.Experience({});
    referenceId = ex._id;
    ex.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'admin', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        done();
    });


  });

  after(function(done){
    model.Experience.remove({}, function(){
      done();
    });
  });


  describe('GET experience', function(){
    it('should return 200 when getting all experience', function(done){
      auth_req
        .get('http://localhost:3000/api/experience')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one experience', function(done){
      auth_req
        .get('http://localhost:3000/api/experience/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all experience when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/experience')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one experience when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/experience/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });


  });

  describe('POST experience', function(){

    it('should return 201 when creating a new experience', function(done){
      auth_req
        .post('http://localhost:3000/api/experience/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new experience when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/experience/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });

  });

  describe('PUT experience', function(){
    it('should return 201 when authenticated', function(done){
      auth_req
        .put('http://localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new experience when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });

  describe('DELETE experience', function(){
    it('Should return 200 when authenticated', function(done){
      auth_req
        .del('http://localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);

          auth_req
            .get('http://localhost:3000/api/experience/' + referenceId)
            .send({})
            .end(function(err, res){
              should.not.exist(err);
              should.not.exist(res.header.cvappauth);
              res.statusCode.should.be.equal(204);
              done();
            });
        });
    });

    it('Should return 403 when not authenticated', function(done){
      unauth_req
        .del('http://localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });
});
