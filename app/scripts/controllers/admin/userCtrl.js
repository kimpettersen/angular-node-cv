
'use strict';

CVApp.controller('UserCtrl', function( $scope, adminService ) {
  $scope.adminService = adminService;
  $scope.adminService.updateResources('user');
  $scope.currentItem = {};
  $scope.status = '';
  $scope.mode = 'create';

  $scope.show = function(item){
    $scope.currentItem = adminService.findById(item);
  };

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
    adminService.user.item = {};
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

});
