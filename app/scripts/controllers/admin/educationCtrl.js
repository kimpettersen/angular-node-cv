
'use strict';

CVApp.controller('EducationCtrl', function($scope, Education) {
  $scope.master = {};
  $scope.ratings = [1, 2, 3, 4, 5];
  $scope.tags = [];

  $scope.addTag = function(tag){
    $scope.tags.push(tag);
  };

  $scope.update = function(education){
    education.tags = $scope.tags;
    $scope.master = angular.copy(education);
    Education.save($scope.master, function(Education){
      $scope.saved = 'Saved!';
    });
  };

  $scope.reset = function(){
    $scope.education = angular.copy($scope.master);
  };

});
