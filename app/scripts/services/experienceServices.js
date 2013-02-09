angular.module('experienceServices', ['ngResource'])
  .factory('Experience', function($resource){
    return $resource('/api/experience/:id');
  });
