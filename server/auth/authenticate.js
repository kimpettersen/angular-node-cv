var mongoose = require("mongoose"),

    extend = require('mongoose-schema-extend'),
    model = require('../api/baseModel.js');

var UserSchema = model.BaseSchema.extend({
  username: String,
  password: String
});
User = mongoose.model('UserModel', UserSchema);

module.exports.UserModel = User;

// us = new User({username: "kim@kim.com", password: "1234"})
// us.save()

module.exports.checkAuth = function(req, res, next) {
  if (!req.session.user_id) {
    res.status(403);
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
};


module.exports = function(app){
  app.post('/auth/login/', function(req, res) {      
    var post = req.body;   
    User.findOne({username: post.username}, function(err, user){
      if(err){
        res.status(500);
        res.send('Error getting user');
        return;
      }else if(!user || user.isDeleted === true){
        res.status(204);
        res.send('User not found');
        return;
      }else if(user.password === post.password){
        res.status(200);
        req.session.user_id = user._id;
        res.send('Succesful login');
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
