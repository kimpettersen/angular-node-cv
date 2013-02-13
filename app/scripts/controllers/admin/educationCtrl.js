
'use strict';

CVApp.controller('EducationCtrl', function($scope, adminService) {

  $scope.adminService = adminService;
  $scope.adminService.updateResources('education');
  $scope.currentItem = {};
  $scope.tags = [];


  $scope.addTag = function(tag){
    if (!$scope.currentItem.tags){
       $scope.currentItem.tags = [];
    }
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
    $scope.currentItem = adminService.findById({type: 'education', id: options.item._id});
    adminService.editResource(options);
  };

  // Wrapper to attach tags to the item
  $scope.createResource = function(options){
    options.item.tags = $scope.tags;
    adminService.createResource(options);
  };

  $scope.edit = function(item){
    $scope.tags = [];
    $scope.currentItem = adminService.findById(item);
    adminService.editItem(item);
  };

});
