angular.module('bucketlistServices', ['ngResource'])
  .factory('Bucketlist', function($resource){
    return $resource('/api/bucketlist/:id',
      {}, {
      edit: {
        method: 'PUT',
        params: {
                id: '@id',
                title: '@title',
                description: '@description'
        }
      }
    });
  });
