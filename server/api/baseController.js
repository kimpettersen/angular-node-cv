var resultHandler = function(error, result, response, returnCode, callback){
    //Default to 200
    var statusCode = returnCode ? returnCode : 200;

    if(error){
      response.status(500);
      return callback({ 'error': 'Internal server error' });
    }else if(result.length < 1){
      response.status(204);
      return callback({ 'res': 'No content' });
    }
    response.status(statusCode);
    return callback({ 'result': result });
};

module.exports.resultHandler = resultHandler;
