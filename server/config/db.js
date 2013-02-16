var mongoose = require ('mongoose'),
    model = require('../api/user/model.js');

var user,
    testuser,
    dbName;

// mongoose.connect('mongodb://kimpettersen:nrrnrr7@ds047427.mongolab.com:47427/cv');


//May add more envs
switch(process.env.NODE_ENV){
        case 'test':
          dbName = 'angularcv_test';
          break;
        default:
          dbName = 'angularcv';

}

mongoose.connect('localhost', dbName);

if (dbName === 'angularcv_test'){
    model.UserModel.remove({}, function(){
      console.log('Emptied users from test database');
    });
}

testuser = {
  'username': 'admin',
  'password': '1234'
};

model.UserModel.find(testuser, function(err, res){
  if(res.length === 0){
    user = new model.UserModel(testuser);
    user.save();
    console.log('Test user created');
  }
});

module.exports.dbName = dbName;

