var model = require('./model.js'),
    controller = require('../baseController.js'),
    mongoose = require('mongoose');

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

  app.get('/api/education/', function(req, res) {
    controller.get(model.Education, {}, function(error, result){
        if(error){
            res.json(error);
        }
        res.json(result);
    });
  });

  app.get('/api/education/:id', function(req, res) {
    var id = req.params.id;
    controller.get(model.Education, { '_id': id }, function(data){
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
