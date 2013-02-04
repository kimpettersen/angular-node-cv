var model = require('./model.js'),
    controller = require('../baseController.js'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

module.exports = function(app){

  app.get('/api/me/?', function(request, response) {
    model.Me.get({}, function(error, result){
     controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });


  app.get('/api/me/:id', function(request, response) {
    var id = request.params.id;
    model.Me.get({'_id': id}, function(error, result){
     controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });

  app.post('/api/me/?', controller.protect, function(request, response) {
    var id;
    var inst = new model.Me(request.body);

    inst.save();
    response.status(201);
    response.json(inst);
  });

  app.put('/api/me/:id', controller.protect, function(request, response) {
    var id;
    model.Me.put({'_id': request.params.id}, request.body, function(error, result){
        controller.resultHandler(error, result, response, 201, function(data){
             response.json(data);
        });

    });
  });

  app.delete('/api/me/:id', controller.protect, function(request, response) {
    var id;
    model.Me.deleteDocument({'_id': request.params.id}, function(error, result){
      controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });

  app.options('/api/me/', function(request, response){
    //Returns documentation
    //res.status(200)
  });

};
