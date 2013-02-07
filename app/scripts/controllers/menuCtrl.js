'use strict'

CVApp.controller('MenuCtrl', function($scope, $location){
  $scope.changeView = function(view){
    $location.path(view);
  };
});
