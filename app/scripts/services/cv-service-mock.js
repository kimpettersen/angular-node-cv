angular.module('CVServicesMock', [])
  .factory('CVServiceMock', function(){

  var adminService = function(type){
    //set the right type for the current ng-model
    //Example: adminService.user.item
    this[type] = {};
    this[type].item = type;
  };

  adminService.prototype.findById = function(item){
    return item;
  };

  adminService.prototype.updateResources = function(item){
    return item;
  };

  adminService.prototype.delItem = function(options, callback){
    //pass the message you want back
    var opt = options === undefined ? {message: 'std message'} : options;
    var cb = callback === undefined ? function(){} : callback;
    if (opt.message === undefined){
      opt.message = 'std message';
    }
    return cb(opt.message);
  };

  adminService.prototype.editItem = function(options, callback){
    //pass the message you want back
    var opt = options === undefined ? {message: 'std message'} : options;
    var cb = callback === undefined ? function(){} : callback;
    if (opt.message === undefined){
      opt.message = 'std message';
    }
    return cb(opt.message);
  };

  adminService.prototype.editResource = function(options, callback){
    //pass the message you want back
    var opt = options === undefined ? {message: 'std message'} : options;
    var cb = callback === undefined ? function(){} : callback;
    if (opt.message === undefined){
      opt.message = 'std message';
    }
    return cb(opt.message);
  };

  adminService.prototype.createResource = function(options, callback){
    //pass the message you want back
    var opt = options === undefined ? {message: 'std message'} : options;
    var cb = callback === undefined ? function(){} : callback;
    if (opt.message === undefined){
      opt.message = 'std message';
    }
    return cb(opt.message);
  };

  return {
    adminService: adminService
  };
});
