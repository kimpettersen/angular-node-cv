'use strict'

CVApp.controller('MenuCtrl', function($scope, $location){
  $scope.changeView = function(view){
    console.log('Hres')
    $location.path(view);
  };
});
