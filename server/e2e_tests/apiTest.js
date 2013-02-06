//Tests returned status codes, restrictions and login
var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    bucketModel = require('../api/bucketlist/model.js');
    eduModel = require('../api/education/model.js');
    expModel = require('../api/experience/model.js');
    meModel = require('../api/me/model.js');
    userModel = require('../api/user/model.js');

mongoose.connect('localhost', 'angularcv_test');



describe('e2e tests for the API', function(){
  
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
                             //Auth
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

  describe('login a user', function(){
    var auth_req = request.agent();

    it('should return 204 if wrong username is passsed', function(done){
      auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'hello@kim.com', 'password': '1234'})
      .end(function(res){
        res.statusCode.should.be.equal(204);
        done();
      });
    });

    it('should return 204 if wrong password is passsed', function(done){
      auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '124343434'})
      .end(function(res){
        res.statusCode.should.be.equal(204);
        done();
      });
    });

    it('should return 200 succes if correct username and password is passsed', function(done){
      auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(res){
        res.statusCode.should.be.equal(200);
        done();
      });
    });

    it('should return 200 succes when logged out', function(done){
      auth_req.get('http://localhost:3000/auth/logout')
      .end(function(res){
        res.statusCode.should.be.equal(200);
        done();
      });
    });

  });

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
                             //Bucketlist
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


describe('Restricted access and status codes for bucketlist', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();
  var referenceId;
  var bl;

  before(function(done){
    
    bl = bucketModel.BucketList();
    referenceId = bl._id;
    bl.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        done();
    });
  });

  after(function(done){
    bucketModel.BucketList.remove({}, function(){
      done();
    });
  });

  describe('GET bucketlist', function(){
    it('should return 200 when getting all bucket list', function(done){
      auth_req
        .get('http://localhost:3000/api/bucketlist/')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one bucketlist', function(done){
      auth_req
        .get('http://localhost:3000/api/bucketlist/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          console.log('http://localhost:3000/api/bucketlist/' + referenceId);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all bucket list when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/bucketlist')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one bucketlist when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/bucketlist/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
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
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new bucketlist when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/bucketlist/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          should.exist(res.headers['set-cookie']);
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
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new bucketlist when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/bucketlist/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
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
          res.statusCode.should.be.equal(200);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('Should return 403 when not authenticated', function(done){
      unauth_req
        .del('http://localhost:3000/api/bucketlist/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
      });
    });
  });

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
                             //Education
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

describe('Restricted access and status codes for education', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();
  var referenceId;
  var ed;  

  before(function(done){
    ed = eduModel.Education();
    referenceId = ed._id;
    ed.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        done();
    });
  });

  after(function(done){
    eduModel.Education.remove({}, function(){
      done();
    });
  });


  describe('GET education', function(){
    it('should return 200 when getting all educations', function(done){
      auth_req
        .get('http://localhost:3000/api/education')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one education', function(done){
      auth_req
        .get('http://localhost:3000/api/education/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all educations when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/education')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one education when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/education/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
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
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new education when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/education/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          should.exist(res.headers['set-cookie']);
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
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new education when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/education/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
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
          res.statusCode.should.be.equal(200);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('Should return 403 when not authenticated', function(done){
      unauth_req
        .del('http://localhost:3000/api/education/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
      });
    });
  });
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
                             //Experience
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

describe('Restricted access and status codes for experience', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();
  var referenceId;
  var ex;

  before(function(done){
    ex = expModel.Experience();
    referenceId = ex._id;
    ex.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        done();
    });


  });

  after(function(done){
    expModel.Experience.remove({}, function(){
      done();
    });
  });


  describe('GET experience', function(){
    it('should return 200 when getting all experience', function(done){
      auth_req
        .get('http://localhost:3000/api/experience')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one experience', function(done){
      auth_req
        .get('http://localhost:3000/api/experience/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all experience when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/experience')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one experience when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/experience/' + referenceId)
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
        .post('http://localhost:3000/api/experience/')
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
        .post('http://localhost:3000/api/experience/')
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
        .put('http://localhost:3000/api/experience/' + referenceId)
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
        .put('http://localhost:3000/api/experience/' + referenceId)
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
        .del('http://localhost:3000/api/experience/' + referenceId)
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
        .del('http://localhost:3000/api/experience/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
      });
    });
  });
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
                             //Me
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
describe('Restricted access and status codes', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();
  var referenceId;
  var me;

  before(function(done){
    me = meModel.Me();
    referenceId = me._id;
    me.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        done();
    });


  });

  after(function(done){
    meModel.Me.remove({}, function(){
      done();
    });
  });


  describe('GET me', function(){
    it('should return 200 when getting all me resources', function(done){
      auth_req
        .get('http://localhost:3000/api/me')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one me', function(done){
      auth_req
        .get('http://localhost:3000/api/me/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting all me resources when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/me')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one me when unauthenticated', function(done){
      auth_req
        .get('http://localhost:3000/api/me/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.headers['set-cookie']);
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
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new me when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/me/')
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          should.exist(res.headers['set-cookie']);
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
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('should return 403 when creating a new me when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/me/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
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
          res.statusCode.should.be.equal(200);
          should.not.exist(res.headers['set-cookie']);
          done();
        });
    });

    it('Should return 403 when not authenticated', function(done){
      unauth_req
        .del('http://localhost:3000/api/me/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
      });
    });
  });

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
                             //User
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
describe('Restricted access and status codes', function(){

  var auth_req = request.agent();
  var unauth_req = request.agent();
  var referenceId;
  var user;

  before(function(done){
    user = userModel.UserModel();
    referenceId = user._id;
    user.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        done();
    });


  });

  after(function(done){
    userModel.UserModel.remove({}, function(){
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



});