// var model = require('./model.js'),
//     controller = require('../baseController.js'),
//     mongoose = require('mongoose'),
//     extend = require('mongoose-schema-extend');

// module.exports = function(app){

//   app.get('/api/courses/', function(request, response) {
//     model.Course.get({}, function(error, result){
//      controller.resultHandler(error, result, response, 200, function(data){
//          response.json(data);
//      });
//     });
//   });


//   app.get('/api/courses/:id', function(request, response) {
//     var id = request.params.id;
//     model.Course.get({'_id': id}, function(error, result){
//      controller.resultHandler(error, result, response, 200, function(data){
//          response.json(data);
//      });
//     });
//   });

//   app.post('/api/course/', function(request, response) {
//     var id;
//     var inst = new model.Course({
//                               title: request.body.title,
//                               description: request.body.description,
//                               dureation: request.duratio,
//                               endDaterequest.body.,
//                               tags: [request.body.]
//                           });

//     inst.save();
//     response.status(201);
//     response.json({ 'result': inst });
//   });

//   app.put('/api/courses/:id', function(request, response) {
//     var id;
//     model.Course.put({'_id': request.params.id}, {
//                                             'university': request.body.university,
//                                             'degree': request.body.degree
//                                           }, function(error, result){
//         controller.resultHandler(error, result, response, 201, function(data){
//              response.json(data);
//         });

//     });
//   });

//   app.delete('/api/courses/:id', function(request, response) {
//     var id;
//     model.Course.deleteDocument({'_id': request.params.id}, function(error, result){
//       controller.resultHandler(error, result, response, 200, function(data){
//          response.json(data);
//      });
//     });
//   });

//   app.options('/api/courses/', function(request, response){
//     //Returns documentation
//     //res.status(200)
//   });

// };
