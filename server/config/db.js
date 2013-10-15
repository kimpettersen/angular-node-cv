var mongoose = require ('mongoose'),
    bucketModel = require('../api/bucketList/model.js'),
    educationModel = require('../api/education/model.js'),
    experienceModel = require('../api/experience/model.js'),
    meModel = require('../api/me/model.js'),
    userModel = require('../api/user/model.js'),
    settings = require('./settings.js'),
    sessionSettings = {};

var user,
    testuser,
    interval,
    dbconn,
    dbName;

var blue  = '\033[34m',
    reset = '\033[0m';


switch(process.env.NODE_ENV){
        case 'test':
          dbName = 'angularcv_test';
          dbString = 'mongodb://127.0.0.1/' + dbName;
          break;
        default:
          sessionSettings.host = 'ds047427.mongolab.com',
          sessionSettings.port = '47427';
          sessionSettings.username = 'production';
          sessionSettings.password = 'y6kge67p';
          dbString = settings.dbString;
          dbName = 'cv';
}

dbconn = function(){
  mongoose.connect(dbString, {auto_reconnect: true, native_parser: true});
};

dbconn();


mongoose.connection.on('error', function (err) {
  dbconn();
});

sessionSettings.db = dbName;

var removeTestData = function(callback){
    bucketModel.BucketList.remove({}, function(){
      console.log(blue + 'Emptied bucketlist');

      educationModel.Education.remove({}, function(){
        console.log(blue + 'Emptied education');

        experienceModel.Experience.remove({}, function(){
          console.log(blue + 'Emptied experience');

          meModel.Me.remove({}, function(){
            console.log(blue + 'Emptied me');

            userModel.UserModel.remove({}, function(){
              console.log(blue + 'Emptied users');
              console.log(blue + 'Finished removing elems from testdatabse');
              callback();
            });
          });
        });
      });
    });
};

var createTestData = function(callback){
  var bucket,
      education,
      experience,
      me,
      user;

  bucket = new bucketModel.BucketList({
                            title: 'bucket title',
                            description: 'bucket description',
                            rating: 1
                            });
  education = new educationModel.Education({
                            institution: 'edu institution',
                            degree: 'edu degree',
                            description: 'edu description',
                            tags: ['edu tag1', 'edu tag2']
                            });
  experience = new experienceModel.Experience({
                            company: 'exp company',
                            description: 'exp description',
                            duration: 'exp duration',
                            tags: ['exp tag1', 'exp tag2']
                            });
  me = new meModel.Me({
                            title:'me title',
                            description:'me description',
                            tags: ['me tag1', 'me tag2']
                            });
  user = new userModel.UserModel({
                            username: 'admin',
                            password: '1234'
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
};

if (dbName === 'angularcv_test'){
    removeTestData(function(){
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


// just to do this with the regular env as well as test
testuser = {
  'username': 'admin',
  'password': '1234'
};

userModel.UserModel.find(testuser, function(err, res){
  if(res.length === 0){
    user = new userModel.UserModel(testuser);
    user.save();
    console.log(blue + 'Test user created');
  }
});

module.exports.dbName = dbName;
module.exports.sessionSettings = sessionSettings;
