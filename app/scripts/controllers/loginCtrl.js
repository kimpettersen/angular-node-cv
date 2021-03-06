'use strict'

Controllers.controller('LoginCtrl', ['$scope', '$http', '$location','loginService', function($scope, $http, $location, loginService){
  $scope.status = '';

  $scope.login = function(args){
    var user = args || {};
    if (user.username && user.password){
      $http.post('/auth/login', user).success(function(data, status, headers, config){
        if (status === 200){
          $scope.status = data;
          localStorage.setItem('loggedIn', true);
          $location.path('/admin');
        }else {
          localStorage.setItem('loggedIn', false);
          $scope.status = 'Wrong username or password';
        }
        loginService.updateStatus();
      }).error(function(res){
        localStorage.setItem('loggedIn', false);
        $scope.status = 'Wrong username or password';
      });
    }else{
      $scope.status = 'Fields can not be blank';
    }
  };
}]);
