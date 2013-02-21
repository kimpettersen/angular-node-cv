'use strict'

Controllers.controller('MenuCtrl', ['$scope', function($scope){

  $scope.changeView = function(view){
    // $location.path(view);
    $scope.a = 1
  };
}]);
