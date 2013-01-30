module.exports.baseController =  function(){

  //Abstract handler for all controller

  var resultHandler = function(err, res, returnCode){
    //Default to 200
    var statusCode = returnCode ? returnCode : 200;

    if(error){
      res.status(500);
      return res.json({ 'error': 'Internal server error' });
    }else if(res.length < 1){
      res.status(204);
      return res.json({ 'res': 'No content' });
    }
    res.status(statusCode);
    res.json({ 'result': res });
  };
};
