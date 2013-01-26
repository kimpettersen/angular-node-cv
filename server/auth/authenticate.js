var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require("mongoose"),
    extend = require('mongoose-schema-extend'),
    model = require('../api/baseModel.js');

var UserSchema = model.BaseSchema.extend({
  email: String,
  password: String
});

User = mongoose.model('UserSchema', UserSchema);

// us = new User({email: "kim@kim.com", password: "1234"})
// us.save()

function find(param, callback) {
  User.findOne({'$or': [{'_id': param }, {'email': param}]}, function(err, res){
    callback(err, res);
  });
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, callback) {
  callback(null, user._id);
});

passport.deserializeUser(function(id, callback) {
  find(id, function (err, user) {
    callback(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(email, password, callback) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      find(email, function(err, user) {
        if (err) { return callback(err); }
        if (!user) { return callback(null, false, { message: 'Unknown user ' + email }); }
        if (user.password != password) { return callback(null, false, { message: 'Invalid password' }); }
        return callback(null, user);
      });
    });
  }
));

// app.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });

// app.get('/login', function(req, res){
//   res.render('login', { user: req.user, message: req.flash('error') });
// });

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
module.exports = function(app){
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
      res.status(200);
      res.json('success', 'Successfully logged in');
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.status(200);
    res.json('success', 'Successfully logged out');
  });

  app.get('/', function(req, res){
    User.find({}, function(err, user){
      res.json(user);
    });
    
  });
};

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401);
  res.json();
};

module.exports.ensureAuthenticated = ensureAuthenticated;