
module.exports = function(app){

  app.get('/api/educations', function(req, res) {

  });

  app.get('/api/education/:id', function(req, res) {
    res.send('You hit an ExpressJS route with ' + req.params.id);
  });

  app.post('/api/educations', function(req, res) {

  });

  app.put('/api/education/:id', function(req, res) {

  });

  app.delete('/api/education/:id', function(req, res) {

  });

};
