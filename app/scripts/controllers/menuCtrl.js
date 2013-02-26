'use strict'

Controllers.controller('MenuCtrl', function($scope, $rootScope, $location, $http, loginService){

  $scope.loginService = loginService;
  $scope.loginService.updateStatus();

  $scope.isLoggedIn = function(){
    return $scope.loginService.loggedIn;
  };

  $scope.changeView = function(view){
    $location.path(view);
  };

  $scope.logout = function(){
    $http.get('/auth/logout').success(function(res){
      $scope.loginService.updateStatus();
    }).error(function(res){
      alert('Error logging out!');
    });
  };

});
