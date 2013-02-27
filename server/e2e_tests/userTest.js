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
    user = new model.UserModel({});
    referenceId = user._id;
    user.save();

    auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'admin', 'password': '1234'})
      .end(function(err, res){
        should.not.exist(err);
        should.not.exist(res.header.cvappauth);
        done();
    });


  });

  afterEach(function(done){
    model.UserModel.remove({}, function(){
      //re initialize user
      var testuser = {
        'username': 'admin',
        'password': '1234'
      };

      user = new model.UserModel(testuser);
      user.save();
      done();
    });
  });


  describe('GET user', function(){
    it('should return 200 when getting all users', function(done){
      auth_req
        .get('http://localhost:3000/api/user')
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one user', function(done){
      auth_req
        .get('http://localhost:3000/api/user/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 403 when getting all users when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/user')
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });

    it('should return 403 when getting one user when not authenticated', function(done){
      unauth_req
        .get('http://localhost:3000/api/user/' + referenceId)
        .end(function(err, res){
          should.not.exist(err);
          should.not.exist(res.header.cvappauth);
          res.statusCode.should.be.equal(403);
          done();
        });
    });


  });

  describe('POST user', function(){

    it('should return 201 when creating a new user', function(done){
      var random = Math.floor(Math.random() * 1000 * 1000 * 1000);
      auth_req
        .post('http://localhost:3000/api/user/')
        .send({ username: 'uniqueusername' + random, password: '1234' })
        .end(function(err, res){
          should.exist(res.header.cvappauth);
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          done();
        });
    });


    it('should return 409 when not passing username', function(done){
      //username empty
      auth_req
        .post('http://localhost:3000/api/user/')
        .send({ username: '', password: '1234' })
        .end(function(err, res){
          should.exist(res.header.cvappauth);
          should.not.exist(err);
          res.statusCode.should.be.equal(409);
          res.body.error.should.be.equal('A username can only be contain A-Z, a-z, - and numbers 0-9');

          //Usernam not defined
          auth_req
            .post('http://localhost:3000/api/user/')
            .send({ password: '1234' })
            .end(function(err, res){
              should.exist(res.header.cvappauth);
              should.not.exist(err);
              res.statusCode.should.be.equal(409);
              res.body.error.should.be.equal('A username can only be contain A-Z, a-z, - and numbers 0-9');

              // Doesn't match /^[a-zA-Z0-9]+$/
              auth_req
                .post('http://localhost:3000/api/user/')
                .send({ username: 'abc$', password: '1234' })
                .end(function(err, res){
                  should.exist(res.header.cvappauth);
                  should.not.exist(err);
                  res.statusCode.should.be.equal(409);
                  res.body.error.should.be.equal('A username can only be contain A-Z, a-z, - and numbers 0-9');
                  done();
                  });
            });
        });
    });


    it('should return 409 when not passing password', function(done){
      //password empty
      auth_req
        .post('http://localhost:3000/api/user/')
        .send({ username: 'kim2', password: '' })
        .end(function(err, res){
          should.exist(res.header.cvappauth);
          should.not.exist(err);
          res.statusCode.should.be.equal(409);
          res.body.error.should.be.equal('Password can not be empty');

          //Password not defined
          auth_req
            .post('http://localhost:3000/api/user/')
            .send({ username: 'kim2' })
            .end(function(err, res){
              should.exist(res.header.cvappauth);
              should.not.exist(err);
              res.statusCode.should.be.equal(409);
              res.body.error.should.be.equal('Password can not be empty');
              done();
            });
        });
    });

    it('Should return error: "username not available" when a username already exists', function(done){
      auth_req
        .post('http://localhost:3000/api/user/')
        .send({ username: 'admin', password: '1234' })
        .end(function(err, res){
          should.exist(res.header.cvappauth);
          should.not.exist(err);
          res.statusCode.should.be.equal(409);
          res.body.error.should.be.equal('username not available');
          done();
      });
    });

    it('should return 403 when creating a new user when not authenticated', function(done){
      unauth_req
        .post('http://localhost:3000/api/user/')
        .send({})
        .end(function(err, res){
          should.not.exist(res.header.cvappauth);
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
    });

    it('should return 409 Conflict when trying to create a user that already exists', function(done){
      auth_req
        .post('http://localhost:3000/api/user/')
        .send({ username: 'admin', password: '1234' })
        .end(function(err, res){
          should.exist(res.header.cvappauth);
          should.not.exist(err);
          res.statusCode.should.be.equal(409);
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
          should.exist(res.header.cvappauth);
          should.not.exist(err);
          should.not.exist(err);
          res.statusCode.should.be.equal(201);
          done();
        });
    });

    it('should return 403 when creating a new user when not authenticated', function(done){
      unauth_req
        .put('http://localhost:3000/api/user/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(res.header.cvappauth);
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
          should.exist(res.header.cvappauth);
          should.not.exist(err);
          res.statusCode.should.be.equal(200);

          auth_req
            .get('http://localhost:3000/api/user/' + referenceId)
            .send({})
            .end(function(err, res){
              should.exist(res.header.cvappauth);
              should.not.exist(err);
              res.statusCode.should.be.equal(204);
              done();
            });
        });
    });

    it('Should return 403 when not authenticated', function(done){
      unauth_req
        .del('http://localhost:3000/api/user/' + referenceId)
        .send({})
        .end(function(err, res){
          should.not.exist(res.header.cvappauth);
          should.not.exist(err);
          res.statusCode.should.be.equal(403);
          done();
        });
    });
  });
});
