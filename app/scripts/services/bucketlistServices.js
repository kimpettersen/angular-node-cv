angular.module('bucketlistServices', ['ngResource'])
  .factory('Bucketlist', function($resource){
    return $resource('/api/bucketlist/:id');
  });
