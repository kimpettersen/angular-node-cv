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
    model.Education.get({'_id': id}, function(error, result){
      res.json(result);
    });
  });

  app.post('/api/education', function(req, res) {
    console.log(req.body);
    var inst = new model.Education({
                            'university': req.body.university,
                            'degree': req.body.degree
                          });

    inst.save();
    res.json(inst);
  });

  app.put('/api/education/:id', function(req, res) {
    model.Education.put({'_id': req.params.id}, {
                                            'university': req.body.university,
                                            'degree': req.body.degree
                                          }, function(error, result){
      res.json(result);
    });

  });

  app.delete('/api/education/:id', function(req, res) {
    model.Education.deleteDocument({'_id': req.params.id}, function(error, result){
      res.json(result);
    });
  });

};
