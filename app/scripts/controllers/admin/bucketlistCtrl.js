
'use strict';

CVApp.controller('BucketlistCtrl', function( $scope, adminService ) {
  $scope.adminService = adminService;
  $scope.ratings = [1, 2, 3 ,4 ,5];
  $scope.adminService.updateResources('bucketlist');
  $scope.currentItem = {};

  $scope.show = function(item){
    $scope.currentItem = adminService.findById(item);
  };

  $scope.edit = function(item){
    $scope.currentItem = adminService.findById(item);
    adminService.editItem(item);
  };

});
