var model = require('./model.js'),
    controller = require('../baseController.js'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

module.exports = function(app){

  app.get('/api/education/', function(request, response) {
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
         response.json(data);
     });
    });
  });

  app.post('/api/education/', function(request, response) {
    var id;
    var inst = new model.Education({
                            'university': request.body.university,
                            'degree': request.body.degree
                          });

    inst.save();
    response.status(201);
    response.json({ 'result': inst });
  });

  app.put('/api/education/:id', function(request, response) {
    var id;
    model.Education.put({'_id': request.params.id}, {
                                            'university': request.body.university,
                                            'degree': request.body.degree
                                          }, function(error, result){
        controller.resultHandler(error, result, response, 201, function(data){
             response.json(data);
        });

    });
  });

  app.delete('/api/education/:id', function(request, response) {
    var id;
    model.Education.deleteDocument({'_id': request.params.id}, function(error, result){
      controller.resultHandler(error, result, response, 200, function(data){
         response.json(data);
     });
    });
  });

  app.options('/api/education/', function(request, response){
    //Returns documentation
    //res.status(200)
  });

};
