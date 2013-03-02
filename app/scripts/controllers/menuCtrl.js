'use strict'

Controllers.controller('MenuCtrl', function($scope, $rootScope, $location, $http, loginService){

  $scope.loginService = loginService;
  $scope.loginService.updateStatus();


  $scope.isLoggedIn = function(){
    //LocalStorage only stores strings
    var res = localStorage.getItem('loggedIn') === 'true' ? true : false;
    return res;
  };

  $scope.changeView = function(view){
    $location.path(view);
  };

  $scope.logout = function(){
    localStorage.setItem('loggedIn', false);
    $http.get('/auth/logout').success(function(res){
      $scope.loginService.updateStatus();
    }).error(function(res){
      alert('Error logging out!');
    });
  };

});
