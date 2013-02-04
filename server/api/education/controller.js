var model = require('./model.js'),
    controller = require('../baseController.js'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

module.exports = function(app){

  app.get('/api/education/?', function(request, response) {
    model.Education.get({}, function(error, result){
     controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });


  app.get('/api/education/:id', function(request, response) {
    var id = request.params.id;
    model.Education.get({'_id': id}, function(error, result){
     controller.resultHandler(error, result, response, 200, function(data){
         response.json(data[0]);
     });
    });
  });

  app.post('/api/education/?', controller.protect, function(request, response) {
    var id;
    var inst = new model.Education(request.body);

    inst.save();
    response.status(201);
    response.json(inst);
  });

  app.put('/api/education/:id', controller.protect, function(request, response) {
    var id;
    model.Education.put({'_id': request.params.id}, request.body, function(error, result){
        controller.resultHandler(error, result, response, 201, function(data){
             response.json(data);
        });

    });
  });

  app.delete('/api/education/:id', controller.protect, function(request, response) {
    var id;
    model.Education.deleteDocument({'_id': request.params.id}, function(error, result){
      controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });

  app.options('/api/education/?', function(request, response){
    //Returns documentation
    //res.status(200)
  });

};
