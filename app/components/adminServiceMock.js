angular.module('adminServicesMock', ['ngResource'])
  .factory('adminServiceMock', function(){

  var adminService = function(type){
    //set the right type for the current ng-model
    //Example: adminService.user.item
    this[type] = {};
    this[type].item = type;
  }

  adminService.prototype.findById = function(item){
    return item
  }

  adminService.prototype.updateResources = function(item){
    return item
  }

  adminService.prototype.delItem = function(options, callback){
    //pass the message you want back
    return callback(options.message)
  }

  adminService.prototype.editResource = function(options, callback){
    //pass the message you want back
    return callback(options.message)
  }

  adminService.prototype.createResource = function(options, callback){
    //pass the message you want back
    return callback(options.message)
  }

  return adminService;
});
