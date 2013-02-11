
'use strict';

CVApp.controller('BucketlistCtrl', function( $scope, adminService ) {
  $scope.adminService = adminService;
  $scope.ratings = [1, 2, 3 ,4 ,5];
  $scope.adminService.updateResources('bucketlist');
});
