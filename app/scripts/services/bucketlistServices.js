angular.module('bucketlistServices', ['ngResource'])
  .factory('Bucketlist', function($resource){
    return $resource('/api/bucketlist/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }});
  });
