
'use strict';

Controllers.controller('BucketlistCtrl', ['$scope', 'adminService', function($scope, adminService){
  $scope.adminService = adminService;
  $scope.ratings = [1, 2, 3 ,4 ,5];
  $scope.currentItem = {};
  $scope.status = '';
  $scope.mode = 'create';
  $scope.adminService.updateResources('bucketlist');


  $scope.edit = function(item){
    $scope.mode = 'edit';
    $scope.currentItem = adminService.findById(item);
    adminService.editItem(item);
  };

  $scope.del = function(item){
    adminService.delItem(item, function(res){
      $scope.status = res;
    });
  };

  $scope.resetCurrent = function(){
    $scope.currentItem = {};
    $scope.mode = 'create';
    adminService.bucketlist.item = {};
  };

  $scope.editResource = function(options){
    //Perform HTTP PUT and saves the changes
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

  $scope.isCreateMode = function(){
    return $scope.mode === 'create';
  };

}]);
