angular.module('userServices', ['ngResource'])
  .factory('User', function($resource){
    return $resource('/api/user/:id');
  });
