var express = require('express');
var connection = require('./config/db.js');


var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

require('./Routes/educationRoutes')(app);
/* Required Route Files */


// mongoose.connect('mongodb://kimpettersen:77yjhw4@ds047427.mongolab.com:47427/cv');

module.exports = app;
// app.listen(3000);


