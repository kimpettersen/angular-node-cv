var mongoose = require ('mongoose'),
    mockgoose = require('Mockgoose'),
    bucketModel = require('../api/bucketList/model.js'),
    educationModel = require('../api/education/model.js'),
    experienceModel = require('../api/experience/model.js'),
    meModel = require('../api/me/model.js'),
    userModel = require('../api/user/model.js'),
    config = require('../../config.js'),
    sessionSettings = {},
    user,
    testuser,
    blue  = '\033[34m',
    reset = '\033[0m';

sessionSettings.db = 'cv'

switch(process.env.NODE_ENV){
  case 'test':
  setUpForTest();
  break;
  case 'production':
  sessionSettings = config.sessionSettings
  mongoose.connect('mongodb://' + sessionSettings.username + ':' + sessionSettings.password + '@' + sessionSettings.host + ':' + sessionSettings.port + '/' + sessionSettings.db);
  break;
  default:
  mongoose.connect('mongodb://localhost/' + sessionSettings.db);
}

function setUpForTest(){
  mongoose.connect('mongodb://localhost/' + sessionSettings.db, function(){
    mongoose.connection.db.dropDatabase();
    createTestData(function(err){
      if (err){
        console.log(reset);
        throw new Error('Error creating test data');
      }else {
        console.log(blue + 'Success!');
        console.log(reset);
      }
    });
  });
}

function createTestData(callback) {
  var bucket,
  education,
  experience,
  me,
  user;

  bucket = new bucketModel.BucketList({
    title: 'bucket title',
    description: 'bucket description',
    rating: 1,
    order: 1
  });

  education = new educationModel.Education({
    institution: 'edu institution',
    degree: 'edu degree',
    description: 'edu description',
    tags: ['edu tag1', 'edu tag2'],
    order: 1
  });

  experience = new experienceModel.Experience({
    company: 'exp company',
    description: 'exp description',
    duration: 'exp duration',
    tags: ['exp tag1', 'exp tag2'],
    order: 1
  });

  me = new meModel.Me({
    title:'me title',
    description:'me description',
    tags: ['me tag1', 'me tag2'],
    order: 1
  });

  user = new userModel.UserModel({
    'username': 'admin',
    'password': '1234'
  });

  try{
    bucket.save();
    console.log(blue + 'Creating new bucket instance');
    education.save();
    console.log(blue + 'Creating new education instance');
    experience.save();
    console.log(blue + 'Creating new experience instance');
    me.save();
    console.log(blue + 'Creating new me instance');
    user.save();
    console.log(blue + 'Creating new user instance');
  }catch(err) {
    return callback(true);
  }
  callback(null);
}

module.exports.sessionSettings = sessionSettings;
