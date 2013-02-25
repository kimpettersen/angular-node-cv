'use strict'

Controllers.controller('MenuCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){
  $scope.loggedIn = false;
  $scope.changeView = function(view){
    $location.path(view);
  };

  $scope.logout = function(){
    $http.get('/auth/logout').success(function(res){
      $scope.loggedIn = false;
    }).error(function(res){
      console.log(res);
    });
  }

  $scope.userstatus = function(){
    $http.get('/auth/userstatus').success(function(res){
      if (res.status === 200){
        $scope.loggedIn = true;
      }else{
        $scope.loggedIn = false;
      }
    }).error(function(res){
      $scope.loggedIn = false;
      console.log(res);
    });
  }


}]);
