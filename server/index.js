var express = require('express'),
    connection = require('./config/db.js'),
    mime = require('mime'),
    MongoStore = require('connect-mongo')(express);


var app = express();
var path = __dirname + '/../app';
var type  = mime.lookup(path);

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static(__dirname + '/../app'));
    app.use(express.session({
      secret: '6C4DDD52C3E48F97574F67DF7251ABEF77BDAA28CE23676B18DD50DAB615BEAA',
      store: new MongoStore({
        db: connection.dbName,
        mongoose_connection: connection.db
      })
    }));
    app.use(app.router);
    app.use(function(req, res) {
      mimeType = mime.lookup(path);
      console.log(mimeType);
      res.sendfile('index.html', {root: path});
    });
});

//Active modules
require('./auth/controller.js')(app);
require('./api/user/controller.js')(app);
require('./api/bucketlist/controller.js')(app);
require('./api/education/controller.js')(app);
require('./api/experience/controller.js')(app);
require('./api/me/controller.js')(app);


module.exports = app;
app.listen(3000);


