angular.module('educationServices', ['ngResource'])
  .factory('Education', function($resource){
    return $resource('/api/education/:id');
  });