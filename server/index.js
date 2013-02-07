var express = require('express'),
    connection = require('./config/db.js');
    MongoStore = require('connect-mongo')(express);

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: '6C4DDD52C3E48F97574F67DF7251ABEF77BDAA28CE23676B18DD50DAB615BEAA',
      store: new MongoStore({
        db: connection.dbName,
        mongoose_connection: connection.db
      })
    }));

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


