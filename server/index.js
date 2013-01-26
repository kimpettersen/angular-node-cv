var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    connection = require('./config/db.js');


var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    // app.use(express.session({ secret: 'veryveryverylongsecret' }));
    app.use(express.logger());
    // app.use(passport.initialize());
    // app.use(passport.session());
});


// app.use(express.logger());
//   app.use(express.cookieParser());
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(express.session({ secret: 'keyboard cat' }));
//   // Initialize Passport!  Also use passport.session() middleware, to support
//   // persistent login sessions (recommended).
//   app.use(passport.initialize());
//   app.use(passport.session());

//Active modules
require('./auth/authenticate.js')(app);
require('./api/education/controller.js')(app);
// require('./Routes/educationRoutes')(app);
// mongoose.connect('mongodb://kimpettersen:77yjhw4@ds047427.mongolab.com:47427/cv');



// module.exports = app;
app.listen(3000);


