// var should = require('should'),
//     http = require('request');

// describe('Education', function(){
//   var id;
//   var url = 'http://localhost:3000/api/education/';

//   describe('Post education', function(){
//     it('Should return 201 Created', function(done){
//       http.post(url, function(err, res, body){
//         if(err){
//           done(err);
//         }
//         res.statusCode.should.be.equal(201);
//         console.log(res);
//         id = res._id;
//         done();
//       });
//     });
//   });

//   describe('Get one education', function(done){
//     http.get(url, function(err, res, body){
//         if(err){
//           done(err);
//         }
//         res.statusCode.should.be.equal(201);
//         id = res._id;
//         done();
//       });
//   });

//   describe('Put education', function(){

//   });
//   // describe('Delete all education', function(done){
//   //   http.del(url, { '_id': id }, function(err, res, body){
//   //     should.not.exist.err(err);
//   //     res.statusCode.should.be.equal(200);
//   //   });
//   // });

// });
