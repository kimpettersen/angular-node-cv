'use strict'

Controllers.controller('MenuCtrl', ['$scope', '$rootScope', '$location', '$http', 'loginService', function($scope, $rootScope, $location, $http, loginService){

  $scope.loginService = loginService;
  $scope.loginService.updateStatus();
  $scope.activePage = $location.path();


  $scope.isLoggedIn = function(){
    //LocalStorage only stores strings
    var res = localStorage.getItem('loggedIn') === 'true' ? true : false;
    return res;
  };

  $scope.changeView = function(view){
    $location.path(view);
    $scope.activePage = $location.path();
  };

  $scope.getActivePage = function(page){
    var res = $scope.activePage === page ? 'active' : '';
    return res;
  };

  $scope.logout = function(){
    localStorage.setItem('loggedIn', false);
    $http.get('/auth/logout').success(function(res){
      $scope.loginService.updateStatus();
    });
  };

}]);
