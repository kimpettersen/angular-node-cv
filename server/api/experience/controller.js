var model = require('./model.js'),
    controller = require('../baseController.js'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

module.exports = function(app){

  app.get('/api/experience/?', function(request, response) {
    model.Experience.get({}, function(error, result){
     controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });


  app.get('/api/experience/:id', function(request, response) {
    var id = request.params.id;
    model.Experience.get({'_id': id}, function(error, result){
     controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });

  app.post('/api/experience/?', controller.protect, function(request, response) {
    var id;
    var inst = new model.Experience(request.body);

    inst.save();
    response.status(201);
    response.json(inst);
  });

  app.put('/api/experience/:id', controller.protect, function(request, response) {
    var id;
    model.Experience.put({'_id': request.params.id}, request.body, function(error, result){
        controller.resultHandler(error, result, response, 201, function(data){
             response.json(data);
        });

    });
  });

  app.delete('/api/experience/:id', controller.protect, function(request, response) {
    var id;
    model.Experience.deleteDocument({'_id': request.params.id}, function(error, result){
      controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });

  app.options('/api/experience/', function(request, response){
    //Returns documentation
    //res.status(200)
  });

};
