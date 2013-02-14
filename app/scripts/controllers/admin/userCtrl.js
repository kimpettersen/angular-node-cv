
'use strict';

CVApp.controller('UserCtrl', function( $scope, adminService ) {
  $scope.adminService = adminService;
  $scope.adminService.updateResources('user');
  $scope.currentItem = {};

  $scope.show = function(item){
    $scope.currentItem = adminService.findById(item);
  };

  $scope.edit = function(item){
    $scope.currentItem = adminService.findById(item);
    adminService.editItem(item);
  };

});
