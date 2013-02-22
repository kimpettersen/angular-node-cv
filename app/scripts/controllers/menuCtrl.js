'use strict'

Controllers.controller('MenuCtrl', ['$scope', '$location', function($scope, $location){
  $scope.changeView = function(view){
    $location.path(view);
    $scope.a = 1
  };
}]);
