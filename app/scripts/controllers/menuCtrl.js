'use strict'

Controllers.controller('MenuCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){
  $scope.changeView = function(view){
    $location.path(view);
  };

  $scope.logout = function(){
    $http.get('/auth/logout').success(function(res){
      console.log(res);
    }).error(function(res){
      console.log(res);
    });
  }
}]);
