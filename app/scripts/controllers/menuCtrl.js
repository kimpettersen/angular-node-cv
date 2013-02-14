'use strict'

CVApp.controller('MenuCtrl', function($scope, $location){
  $scope.changeView = function(view){
    console.log(view);
    $location.path(view);
  };
});
