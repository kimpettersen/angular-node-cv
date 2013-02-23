
'use strict';

Controllers.controller('BucketlistCtrl', ['$scope', 'adminService', function($scope, adminService){
  $scope.adminService = adminService;
  $scope.ratings = [1, 2, 3 ,4 ,5];
  $scope.currentItem = {};
  $scope.status = '';
  $scope.mode = 'Create mode';
  $scope.adminService.updateResources('bucketlist');

  $scope.show = function(item){
    $scope.currentItem = adminService.findById(item);
  };

  $scope.edit = function(item){
    $scope.currentItem = adminService.findById(item);
    adminService.editItem(item);
  };

  $scope.resetCurrent = function(){
    $scope.currentItem = {};
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

  $scope.isCreateMode = function(){
    return $scope.mode === 'create';
  };

  $scope.$watch('currentItem', function(){
    if (Object.keys($scope.currentItem).length === 0){
      $scope.mode = 'create';
    }else{
      $scope.mode = 'edit';
    }
  }, true);

}]);
