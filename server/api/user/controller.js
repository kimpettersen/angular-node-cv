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
    var regex = /^[a-zA-Z0-9]+$/;


    //Check if username is passed and not empty string
    if (request.body.username === undefined || request.body.username.match(regex) === null){
      response.status(409);
      response.json({ error: 'A username can only be contain A-Z, a-z, - and numbers 0-9' });
      return;
    }

    //Check if password is passed and not empty string
    if (request.body.password === undefined || request.body.password === ""){
      response.status(409);
      response.json({ error: 'Password can not be empty' });
      return;
    }

    //Check if username already exists
    model.UserModel.find({username: request.body.username}, function(err, res){
      if (res.length !== 0){
        if (res[0].isDeleted === false){
          response.status(409);
          response.json({ error: 'username not available' });
          return;
        }
      }

      // User can be created
      var inst = new model.UserModel(request.body);
      inst.save();
      response.status(201);
      response.json(inst);
    });
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
