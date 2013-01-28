var mongoose = require("mongoose"),

    extend = require('mongoose-schema-extend'),
    model = require('../api/baseModel.js');

var UserSchema = model.BaseSchema.extend({
  username: String,
  password: String
});
User = mongoose.model('UserSchema', UserSchema);


// us = new User({username: "kim@kim.com", password: "1234"})
// us.save()

function checkAuth(req, res, next) {
  console.log(req.session);
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}


module.exports = function(app){
  app.post('/login', function(req, res) {      
    var post = req.body;   
    User.findOne({username: post.username}, function(err, user){
      if(err){
        return;
      }else if(!user || user.isDeleted === true){
        res.send('User not found');
        return;
      }else if(user.password === post.password){
        req.session.user_id = user._id;
        res.send('Succesful login');
        return;
      }

      res.send('Unsuccesful login');
    });
  });

  app.get('/logout', function(req, res){
    delete req.session.user_id;
    res.status(200);
    res.send('success', 'Successfully logged out');
  });

  app.get('/', checkAuth, function(req, res){
    User.find({}, function(err, user){
      res.json(user);
    });
    
  });
};
