var resultHandler = function(error, result, response, returnCode, callback){
    //Default to 200
    var statusCode = returnCode ? returnCode : 200;

    if(error){
      response.status(500);
      return callback('Internal server error');
    }else if(result.length < 1){
      response.status(204);
      return callback('No content');
    }
    response.status(statusCode);
    return callback(result);
};

module.exports.resultHandler = resultHandler;
