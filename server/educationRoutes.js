
module.exports = function(app){

  app.get('/api/educations/', function(req, res) {
    var data = {
      'university': 'Oslo',
      'degree': 'Bachelor in Software Engineer'
    };
    res.json(data);
  });

  app.get('/api/education/:id', function(req, res) {
    var data = {
      'university': 'Oslo',
      'degree': 'Bachelor in Software Engineer'
    };
    res.json(data);
  });

  app.post('/api/educations', function(req, res) {

  });

  app.put('/api/education/:id', function(req, res) {

  });

  app.delete('/api/education/:id', function(req, res) {

  });

};
