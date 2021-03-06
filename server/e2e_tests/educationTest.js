var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    model = require('../api/education/model.js');

var referenceId;
var ed;

describe('Restricted access and status codes', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();


  beforeEach(function(done){
    ed = model.Education();
    referenceId = ed._id;
    ed.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'admin', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        should.not.exist(res.header.cvappauth);
        done();
    });
  });

  afterEach(function(done){
    model.Education.remove({}, function(){
      done();
    });
  });


  describe('GET education', function(){
    it('should return 200 when getting all educations', function(done){
      auth_req
        .get('http://localhost:3000/api/education')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one education', function(done){
      auth_req
        .get('http://localhost:3000/api/education/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all educations when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/education')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one education when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/education/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });


  });

  describe('POST education', function(){

    it('should return 201 when creating a new education', function(done){
      auth_req
        .post('http://localhost:3000/api/education/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new education when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/education/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });

  });

  describe('PUT education', function(){
    it('should return 201 when authenticated', function(done){
      auth_req
        .put('http://localhost:3000/api/education/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new education when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/education/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });

  describe('DELETE education', function(){
    it('Should return 200 when authenticated', function(done){
      auth_req
        .del('http://localhost:3000/api/education/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);

          auth_req
            .get('http://localhost:3000/api/education/' + referenceId)
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
        .del('http://localhost:3000/api/education/' + referenceId)
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
