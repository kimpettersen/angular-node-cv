var model = require('../api/user/model.js');

module.exports = function(app){
  app.post('/auth/login/?', function(req, res) {
    var post = req.body;
    model.UserModel.findOne({ username: post.username }, function(err, user){
      console.log(user);
      if(err){
        res.status(500);
        res.json('Error getting user');
        return;
      }else if(!user || user.isDeleted === true){
        res.status(204);
        res.json('User not found');
        return;
      }else if(user.password === post.password){
        res.status(200);
        req.session.user_id = user._id;
        res.json('Succesful login');
        return;
      }
      res.status(500);
      res.send('Unsuccesful login');
    });
  });

  app.get('/auth/logout/?', function(req, res){
    delete req.session.user_id;
    res.status(200);
    res.send('Successfully logged out');
  });

  //example
  // app.get('/', checkAuth, function(req, res){
  //   User.find({}, function(err, user){
  //     res.json(user);
  //   });
  // });
};