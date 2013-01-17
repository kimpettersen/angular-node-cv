
var express = require('express');
var mongoose = require('mongoose');
// require('./Models/education')

var app = express();

require('./educationRoutes')(app);
/* Required Route Files */


// mongoose.connect('mongodb://kimpettersen:77yjhw4@ds047427.mongolab.com:47427/cv');
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('skeleton_db', server);

db.open(function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

module.exports = app;
