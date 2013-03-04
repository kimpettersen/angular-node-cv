
'use strict';

CVApp.controller('MeCtrl', function($scope, adminService) {

  $scope.adminService = adminService;
  $scope.adminService.updateResources('me');
  $scope.currentItem = {};
  $scope.currentItem.tags = [];
  $scope.status = '';
  $scope.mode = 'create';

  $scope.addTag = function(tag){
    if (!$scope.currentItem.tags){
       $scope.currentItem.tags = [];
    }
    $scope.currentItem.tags.push(tag);

  };

  $scope.removeTag = function(tag){
    for (var i = 0; i < $scope.currentItem.tags.length; i++){
      if ($scope.currentItem.tags[i] === tag){
        $scope.currentItem.tags.splice(i, 1);
      }
    }
  };

  // Wrapper to attach tags to the item
  $scope.editResource = function(options){
    $scope.currentItem = adminService.findById({type: 'me', id: options.item._id});
    adminService.editResource(options, function(res){
      $scope.status = res;
    });
  };

  // Wrapper to attach tags to the item
  $scope.createResource = function(options){
    options.item.tags = $scope.currentItem.tags;
    adminService.createResource(options, function(res){
      $scope.status = res;
    });
  };

  $scope.edit = function(item){
    $scope.tags = [];
    $scope.currentItem = adminService.findById(item);
    adminService.editItem(item);
    $scope.mode = 'edit';
  };

  $scope.del = function(item){
    adminService.delItem(item, function(res){
      $scope.status = res;
    });
  };

  $scope.resetCurrent = function(){
    $scope.currentItem = {};
    $scope.currentItem.tags = [];
    $scope.mode = 'create';
    adminService.me.item = {};
  };

  $scope.isCreateMode = function(){
    return $scope.mode === 'create';
  };

});
