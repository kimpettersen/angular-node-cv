var controller = require('../api/baseController.js'),
    model = require('../api/user/model.js');

module.exports = function(app){
  app.post('/auth/login/?', function(req, res) {
    var post = req.body;
    model.UserModel.findOne({ username: post.username }, function(err, user){
      if(err){
        res.status(500);
        res.json('Error getting user');
        return;
      }else if(!user || user.isDeleted === true){
        console.log('user is deleted', user);
        res.status(204);
        res.json('Unsuccesful login');
        return;
      }else if(user.password === post.password){
        res.status(200);
        req.session.user_id = user._id;
        req.session.username = user.username;
        // res.setHeader('CVAppAuth', true);
        res.json('Succesful login');
        return;
      }else{
        res.status(204);
        //Wrong password
        res.json('Unsuccesful login');
        return;
      }
    });
  });

  app.get('/auth/logout/?', function(req, res){
    delete req.session.user_id;
    res.status(200);
    res.send('Successfully logged out');
  });

  app.get('/auth/userstatus', controller.protect,  function(req, res){
    res.status(200);
    res.send('success');
  });

  //example
  // app.get('/', checkAuth, function(req, res){
  //   User.find({}, function(err, user){
  //     res.json(user);
  //   });
  // });
};
