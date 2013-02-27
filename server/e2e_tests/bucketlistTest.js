var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    model = require('../api/bucketlist/model.js');

var referenceId;
var bl;

mongoose.connect('localhost', 'angularcv_test');


describe('Restricted access and status codes', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();

  beforeEach(function(done){
    bl = new model.BucketList({});
    referenceId = bl._id;
    bl.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'admin', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(res.header.cvappauth);
        should.not.exist(err);
        done();
    });
  });

  afterEach(function(done){
    model.BucketList.remove({}, function(){
      done();
    });
  });

  describe('GET bucketlist', function(){
    it('should return 200 when getting all bucket list', function(done){
      auth_req
        .get('http://localhost:3000/api/bucketlist/')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one bucketlist', function(done){
      auth_req
        .get('http://localhost:3000/api/bucketlist/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all bucket list when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/bucketlist')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one bucketlist when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/bucketlist/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });


  });

  describe('POST bucketlist', function(){

    it('should return 201 when creating a new bucketlist', function(done){
      auth_req
        .post('http://localhost:3000/api/bucketlist/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new bucketlist when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/bucketlist/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });

  });

  describe('PUT bucketlist', function(){
    it('should return 201 when authenticated', function(done){
      auth_req
        .put('http://localhost:3000/api/bucketlist/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new bucketlist when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/bucketlist/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });

  describe('DELETE bucketlist', function(){
    it('Should return 200 when authenticated', function(done){
      auth_req
        .del('http://localhost:3000/api/bucketlist/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);

          //try to get the item
          auth_req
            .get('http://localhost:3000/api/bucketlist/' + referenceId)
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
        .del('http://localhost:3000/api/bucketlist/' + referenceId)
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
