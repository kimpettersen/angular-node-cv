
'use strict';

CVApp.controller('BucketlistCtrl', function( $scope, adminService ) {
  $scope.adminService = adminService;
  $scope.adminService.updateResources('bucketlist');
});
