
'use strict';

CVApp.controller('EducationCtrl', function($scope, adminService) {

  $scope.adminService = adminService;
  $scope.adminService.updateResources('education');
  $scope.tags = [];

  $scope.addTag = function(tag){
    $scope.tags.push(tag);
  };

  // Wrapper to attach tags to the item
  $scope.editResource = function(options){
    options.item.tags = $scope.tags;
    adminService.editResource(options);
  };

  // Wrapper to attach tags to the item
  $scope.createResource = function(options){
    options.item.tags = $scope.tags;
    adminService.createResource(options);
  };

  // $scope.ratings = [1, 2, 3, 4, 5];
  // $scope.tags = [];

  // $scope.addTag = function(tag){
  //   $scope.tags.push(tag);
  // };

  // $scope.update = function(education){
  //   education.tags = $scope.tags;
  //   $scope.master = angular.copy(education);
  //   Education.save($scope.master, function(Education){
  //     $scope.saved = 'Saved!';
  //   });
  // };

  // $scope.reset = function(){
  //   $scope.education = angular.copy($scope.master);
  // };

});
