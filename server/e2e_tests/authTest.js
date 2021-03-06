var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    model = require('../api/user/model.js');

    var auth_req = request.agent();
    var unauth_req = request.agent();



  //Make sure the user isn't logged in
  describe('login a user', function(){

    it('should return 204 if wrong username is passsed', function(done){
      auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'hello@kim.com', 'password': '1234'})
      .end(function(res){
        should.not.exist(res.header.CVAppAuth);
        res.statusCode.should.be.equal(204);
        done();
      });
    });

    it('should return 204 if wrong password is passsed', function(done){
      auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'admin', 'password': '124343434'})
      .end(function(res){
        should.not.exist(res.header.CVAppAuth);
        res.statusCode.should.be.equal(204);
        done();
      });
    });

    it('should return 200 succes if correct username and password is passsed', function(done){
      auth_req.post('http://localhost:3000/auth/login')
      .send({'username': 'admin', 'password': '1234'})
      .end(function(res){
        should.not.exist(res.header.CVAppAuth);
        res.statusCode.should.be.equal(200);
        done();
      });
    });

    it('should return 200 succes when logged out', function(done){
      auth_req.get('http://localhost:3000/auth/logout')
      .end(function(res){
        should.not.exist(res.header.CVAppAuth);
        res.statusCode.should.be.equal(200);
        done();
      });
    });

  });


  describe('Check user status', function(){
    it('should have CVAppAuth set to true if logged in', function(done){
      auth_req.post('http://localhost:3000/auth/login')
          .send({'username': 'admin', 'password': '1234'})
          .end(function(res){
              auth_req.get('http://localhost:3000/auth/userstatus')
              .end(function(res){
                res.should.have.header('CVAppAuth', 'true');
                done();
              });
          });
    });

    it('should have CVAppAuth set to true if logged in', function(done){
      unauth_req.get('http://localhost:3000/auth/userstatus')
      .end(function(res){
        should.not.exist(res.headers.cvappauth);
        done();
      });
    });
  });


