var userModel = require('./user/model.js');


module.exports.resultHandler = function(error, result, response, returnCode, callback){
    //Default to 200
    var statusCode = returnCode ? returnCode : 200;

    if(error || result === null){
      response.status(500);
      return callback('Internal server error');
    }else if(result.length < 1){
      response.status(204);
      return callback('No content');
    }
    response.status(statusCode);
    return callback(result);
};

module.exports.protect = function(req, res, next) {
  if(!req.session.user_id) {
    res.status(403);
    if(res.headers){
      if (res.headers.CVAppAuth){
        delete res.headers.CVAppAuth;
      }
    }

    res.json('You are not authorized to view this page');
  } else {
    res.setHeader('CVAppAuth', 'true');
    next();
  }
};
