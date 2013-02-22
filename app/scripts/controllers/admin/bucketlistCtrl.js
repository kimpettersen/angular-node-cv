
'use strict';

Controllers.controller('BucketlistCtrl', ['$scope', 'adminService', function($scope, adminService){
  $scope.adminService = adminService;
  $scope.ratings = [1, 2, 3 ,4 ,5];
  $scope.currentItem = {};
  $scope.status = '';
  $scope.adminService.updateResources('bucketlist');

  $scope.show = function(item){
    $scope.currentItem = adminService.findById(item);
  };

  $scope.edit = function(item){
    $scope.currentItem = adminService.findById(item);
    adminService.editItem(item);
  };

  $scope.editResource = function(options){
    adminService.editResource(options, function(res){
      $scope.status = res;
    });
  };

  // Wrapper to attach tags to the item
  $scope.createResource = function(options){
    adminService.createResource(options, function(res){
      $scope.status = res;
    });
  };

}]);
