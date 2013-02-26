'use strict'

Controllers.controller('MenuCtrl', function($scope, $rootScope, $location, $http, loginStatus){

  $scope.loginStatus = loginStatus;

  console.log(loginStatus.loggedIn, $scope.loggedIn);

  $scope.loginStatus.updateStatus();

  $scope.isLoggedIn = function(){
    return $scope.loginStatus.loggedIn;
  };

  $scope.changeView = function(view){
    $location.path(view);
  };

  $scope.logout = function(){
    $http.get('/auth/logout').success(function(res){
      $scope.loginStatus.updateStatus();
    }).error(function(res){
      alert('Error logging out!');
    });
  };

});
