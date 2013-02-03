var request = require('superagent'),
    should = require('should');


describe('GET education', function(){
  it('should give you access to get', function(done){
    request
      .get('localhost:3000/api/education')
      .end(function(err, res){
        console.log(res.statusCode);
        res.statusCode.should.be.equal(200);
        done();
      });
  });
});
