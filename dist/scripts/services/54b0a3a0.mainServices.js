angular.module('mainServices', ['ngResource'])
  .factory('mainService', function($resource){
    var service = {};
    service.bucketlist = {};
    service.education = {};
    service.experience = {};
    service.me = {};
    service.user = {};

    service.bucketlist.resource = $resource('/api/bucketlist/:id');

    service.education.resource = $resource('/api/education/:id');

    service.experience.resource = $resource('/api/experience/:id');

    service.me.resource = $resource('/api/me/:id');

    service.user.resource = $resource('/api/user/:id');

    service.get = function(options){
      return service[options.type].resource.query();
    };

    return service;
});
