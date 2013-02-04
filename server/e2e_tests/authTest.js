var request = require('superagent'),
    should = require('should');

  //Make sure the user isn't logged in
  describe('login a user', function(){
    it('should return 204 if wrong username is passsed', function(done){
      request.post('localhost:3000/auth/login')
      .send({'username': 'hello@kim.com', 'password': '1234'})
      .end(function(res){
        res.statusCode.should.be.equal(204);
        done();
      });
    });

    it('should return 204 if wrong password is passsed', function(done){
      request.post('localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '124343434'})
      .end(function(res){
        res.statusCode.should.be.equal(204);
        done();
      });
    });

    it('should return 200 succes if correct username and password is passsed', function(done){
      request.post('localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(res){
        res.statusCode.should.be.equal(200);
        done();
      });
    });

    it('should return 200 succes when logged out', function(done){
      request.get('localhost:3000/auth/logout')
      .end(function(res){
        res.statusCode.should.be.equal(200);
        done();
      });
    });

  });

