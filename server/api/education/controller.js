var model = require('./model.js'),
    controller = require('../baseController.js'),
    mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');

module.exports = function(app){

  app.get('/api/education/', function(req, res) {
    model.Education.get({}, function(error, result){
      if(error){
        //Internal server error
        res.status(500);
        return res.json({ 'error': 'Internal server error' });
      }else if(result.length < 1){
        //No content
        res.status(204);
        res.json({ 'result': 'No content' });
      }
      res.status(200);
      res.json({ 'result': result });
    });
  });


  app.get('/api/education/:id', function(req, res) {
    var id = req.params.id;
    model.Education.get({'_id': id}, function(error, result){
      res.status(200);
      res.json({ 'result': result });
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
    res.json({ 'result': inst });
  });

  app.put('/api/education/:id', function(req, res) {
    var id;
    model.Education.put({'_id': req.params.id}, {
                                            'university': req.body.university,
                                            'degree': req.body.degree
                                          }, function(error, result){
      id = res.id;

      if(error){
        res.status(500);
        return res.json({ 'error': 'Internal server error' });
      }else if(result.length === 0){
        //No content
        res.status(204);
        res.json({ 'result': 'No content' });
      }else{
        //Created
        res.status(201);
        res.json({ 'result': result });
      }
      //investigate this.
      res.set({ 'ETag': id });
      res.json(result);
    });
  });

  app.delete('/api/education/:id', function(req, res) {
    var id;
    model.Education.deleteDocument({'_id': req.params.id}, function(error, result){
      if(error){
        res.status(500);
        return res.json({ 'error': 'Internal server error' });
      }else if(result.length === 0){
        //No content
        res.status(204);
        res.json({ 'result': 'No content' });
      }else{
        //Created
        res.status(200);
        res.json({ 'result': result });
      }

      res.json(result);
    });
  });

  app.options('/api/education/', function(req, res){
    //Returns documentation
    //res.status(200)
  });

};
