
'use strict';

CVApp.controller('EducationCreateCtrl', function($scope, $routeParams, $http) {
  $scope.master = {};

  $scope.update = function(education){
    $scope.master = angular.copy(education);
  };

  $scope.reset = function(){
    $scope.education = angular.copy($scope.master);
  };

});
