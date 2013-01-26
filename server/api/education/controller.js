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
    var id;
    var inst = new model.Education({
                            'university': req.body.university,
                            'degree': req.body.degree
                          });

    inst.save();
    id = inst._id;
    res.set({ 'ETag': id });
    res.status(201);
    res.json(inst);
  });

  app.put('/api/education/:id', function(req, res) {
    var id;
    model.Education.put({'_id': req.params.id}, {
                                            'university': req.body.university,
                                            'degree': req.body.degree
                                          }, function(error, result){
      id = res.id;

      if(error){
        //Internal server error
        res.status(500);
      }else if(res.length === 0){
        //No content
        res.status(204);
      }else{
        //Created
        res.status(201);
      }
      res.set({ 'ETag': id });
      res.json(result);
    });
  });

  app.delete('/api/education/:id', function(req, res) {
    var id;
    model.Education.deleteDocument({'_id': req.params.id}, function(error, result){
         // A successful response SHOULD be 200 (OK) if the response includes an
         // entity describing the status, 202 (Accepted) if the action has not
         // yet been enacted, or 204 (No Content) if the action has been enacted
         // but the response does not include an entity.
      res.json(result);
    });
  });

  app.options('/api/education/', function(req, res){
    //Returns documentation
    //res.status(200)
  });

};
