var model = require('./model.js'),
    controller = require('../baseController.js'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

module.exports = function(app){

  app.get('/api/user/?', controller.protect, function(request, response) {
    model.UserModel.get({}, function(error, result){
     controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });


  app.get('/api/user/:id', controller.protect, function(request, response) {
    var id = request.params.id;
    model.UserModel.get({'_id': id}, function(error, result){
     controller.resultHandler(error, result, response, 200, function(data){
         response.json(data[0]);
     });
    });
  });

  app.post('/api/user/?', controller.protect, function(request, response) {
    var id;
    var inst = new model.UserModel(request.body);

    inst.save();
    response.status(201);
    response.json(inst);
  });

  app.put('/api/user/:id', controller.protect, function(request, response) {
    var id;
    model.UserModel.put({'_id': request.params.id}, request.body, function(error, result){
        controller.resultHandler(error, result, response, 201, function(data){
             response.json(data);
        });

    });
  });

  app.delete('/api/user/:id', controller.protect, function(request, response) {
    var id;
    model.UserModel.deleteDocument({'_id': request.params.id}, function(error, result){
      controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });

  app.options('/api/user/?', function(request, response){
    //Returns documentation
    //res.status(200)
  });

};
