'use strict'

Controllers.controller('MenuCtrl', ['$scope', '$rootScope', '$location', '$http', 'loginService', function($scope, $rootScope, $location, $http, loginService){

  $scope.loginService = loginService;
  $scope.loginService.updateStatus();

  $scope.isLoggedIn = function(){
    //LocalStorage only stores strings
    var res = localStorage.getItem('loggedIn') === 'true' ? true : false;
    return res;
  };

  $scope.getActivePage = function(page){
   var res = $location.path().substr(0, page.length) === page ? 'active' : '';
   return res;
  };

  $scope.logout = function(){
    localStorage.setItem('loggedIn', false);
    $http.get('/auth/logout').success(function(res){
      $scope.loginService.updateStatus();
    });
  };

}]);
