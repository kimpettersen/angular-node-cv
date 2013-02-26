'use strict'

Controllers.controller('LoginCtrl', function($scope, $http, loginService){
  $scope.status = '';
  $scope.loggedIn;
  $scope.login = function(args){
    var user = args || {};
    if (user.username !== undefined && user.password !== undefined){
      $http.post('/auth/login', user).success(function(data, status, headers, config){
        if (status === 200){
          $scope.status = data;
        }else {
          $scope.status = 'Wrong username or password';
        }
      }).error(function(res){
        $scope.status = 'Wrong username or password';
      });
    }else{
      $scope.status = 'Fields can not be blank';
    }
    loginService.updateStatus();
  };
});
