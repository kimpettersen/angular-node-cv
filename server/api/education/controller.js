var model = require('./model.js'),
    controller = require('../baseController.js'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

module.exports = function(app){

  app.get('/api/education/', function(req, res) {
    model.Education.get({}, function(error, result){
      if(error){
        throw error;
      }
      res.json(result);
    });
  });


  app.get('/api/education/:id', function(req, res) {
    var id = req.params.id;
    controller.get({ 'model': model.Education, 'params':{ '_id': id } }, function(data){
        res.json(data);
    });
  });

  app.post('/api/education', function(req, res) {

  });

  app.put('/api/education/:id', function(req, res) {

  });

  app.delete('/api/education/:id', function(req, res) {

  });

};
