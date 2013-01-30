module.exports = function(app){
  app.post('/auth/login/', function(req, res) {
    var post = req.body;
    User.findOne({username: post.username}, function(err, user){
      if(err){
        res.status(500);
        res.json({ 'result':'Error getting user' });
        return;
      }else if(!user || user.isDeleted === true){
        res.status(204);
        res.json({ result: 'User not found' });
        return;
      }else if(user.password === post.password){
        res.status(200);
        req.session.user_id = user._id;
        res.json({'result': 'Succesful login'});
        return;
      }
      res.status(500);
      res.send('Unsuccesful login');
    });
  });

  app.get('/auth/logout/', function(req, res){
    delete req.session.user_id;
    res.status(200);
    res.send('success', 'Successfully logged out');
  });

  //example
  // app.get('/', checkAuth, function(req, res){
  //   User.find({}, function(err, user){
  //     res.json(user);
  //   });
  // });
};