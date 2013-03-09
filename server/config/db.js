var mongoose = require ('mongoose'),
    bucketModel = require('../api/bucketlist/model.js'),
    educationModel = require('../api/education/model.js'),
    experienceModel = require('../api/experience/model.js'),
    meModel = require('../api/me/model.js'),
    userModel = require('../api/user/model.js');

var user,
    testuser,
    dbName;

var blue  = '\033[34m',
    reset = '\033[0m';




//May add more envs
switch(process.env.NODE_ENV){
        case 'test':
          dbName = 'angularcv_test';
          mongoose.connect('localhost', dbName);
          break;
        default:
          mongoose.connect('mongodb://kimpettersen:nrrnrr7@ds047427.mongolab.com:47427/cv');
          dbName = 'cv';
}

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
