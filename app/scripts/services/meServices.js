angular.module('meServices', ['ngResource'])
  .factory('Me', function($resource){
    return $resource('/api/me/:id');
  });
