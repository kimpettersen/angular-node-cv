var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    model = require('../api/me/model.js');

var referenceId;
var me;

describe('Restricted access and status codes', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();


  beforeEach(function(done){
    me = new model.Me({});
    referenceId = me._id;
    me.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'admin', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        should.not.exist(res.header.cvappauth);
        done();
    });


  });

  afterEach(function(done){
    model.Me.remove({}, function(){
      done();
    });
  });


  describe('GET me', function(){
    it('should return 200 when getting all me resources', function(done){
      auth_req
        .get('http://localhost:3000/api/me')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one me', function(done){
      auth_req
        .get('http://localhost:3000/api/me/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all me resources when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/me')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one me when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/me/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });


  });

  describe('POST me', function(){

    it('should return 201 when creating a new me', function(done){
      auth_req
        .post('http://localhost:3000/api/me/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new me when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/me/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });

  });

  describe('PUT me', function(){
    it('should return 201 when authenticated', function(done){
      auth_req
        .put('http://localhost:3000/api/me/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new me when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/me/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });

  describe('DELETE me', function(){
    it('Should return 200 when authenticated', function(done){
      auth_req
        .del('http://localhost:3000/api/me/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);

          auth_req
            .get('http://localhost:3000/api/me/' + referenceId)
            .send({})
            .end(function(err, res){
              should.not.exist(err);
              res.statusCode.should.be.equal(204);
              should.not.exist(res.header.cvappauth);
              done();
            });
        });
    });

    it('Should return 403 when not authenticated', function(done){
      unauth_req
        .del('http://localhost:3000/api/me/' + referenceId)
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
