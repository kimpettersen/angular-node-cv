var request = require('superagent'),
    should = require('should'),
    mongoose = require('mongoose'),
    model = require('../api/education/model.js');

var referenceId;
var ed;

mongoose.connect('localhost', 'angularcv_test');


describe('Restricted access and status codes', function(){

  beforeEach(function(done){
    ed = model.Education();
    referenceId = ed._id;
    ed.save();
    request.post('localhost:3000/auth/login')
      .send({'username': 'kim@kim.com', 'password': '1234'})
      .end(function(res){
        res.statusCode.should.be.equal(200);
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
      request
        .get('localhost:3000/api/education')
        .end(function(res){
          res.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should return 200 when getting one education', function(done){
      request
        .get('localhost:3000/api/education/' + referenceId)
        .end(function(res){
          res.statusCode.should.be.equal(200);
          done();
        });
    });
  });
});
