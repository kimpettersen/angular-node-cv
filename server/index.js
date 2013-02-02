var express = require('express'),
    connection = require('./config/db.js'),
    // MongoStore = require('connect-mongo')(express);

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    // app.use(express.session({
    // secret: 'ae765e56ae5eef567fae567aef567fe675aef56f5e76ef765fae765aef567fae567fae',
    // store: new MongoStore({
    //     db: 'angularcv',
    //     mongoose_connection: connection.db
    //   })
    // }));

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
// require('./auth/authenticate.js')(app);
require('./api/bucketlist/controller.js')(app);
require('./api/education/controller.js')(app);
require('./api/experience/controller.js')(app);
require('./api/me/controller.js')(app);
// require('./Routes/educationRoutes')(app);
// mongoose.connect('mongodb://kimpettersen:77yjhw4@ds047427.mongolab.com:47427/cv');



// module.exports = app;
app.listen(3000);


