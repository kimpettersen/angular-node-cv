var model = require('./model.js');
var controller = require('../baseController.js');
var mongoose = require('mongoose');

var ed = new model.Education({
    university: 'Oslo',
    degree: 'Engineer'
});

ed.save(function(err){
    if(err){
        console.log(err);
    }
    console.log('Created ..');
});



module.exports = function(app){

  app.get('/api/educations/', function(req, res) {
    controller.get( { 'model': model.Education }, function(data){
        res.json(data);
    });
  });

  app.get('/api/education/:id', function(req, res) {
    var id = req.params.id;
    controller.get( { 'model': model.Education, 'id': id }, function(data){
        res.json(data);
    });
  });

  app.post('/api/educations', function(req, res) {

  });

  app.put('/api/education/:id', function(req, res) {

  });

  app.delete('/api/education/:id', function(req, res) {

  });

};
