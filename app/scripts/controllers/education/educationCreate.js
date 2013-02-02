
'use strict';

CVApp.controller('EducationCreateCtrl', function($scope, Education) {
  $scope.master = {};
  $scope.saved = 'Not saved';

  $scope.update = function(education){
    $scope.master = angular.copy(education);
    Education.save($scope.master, function(Education){
      $scope.saved = 'Saved!';
    });
  };

  $scope.reset = function(){
    $scope.education = angular.copy($scope.master);
  };

});
