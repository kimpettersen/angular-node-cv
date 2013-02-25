'use strict'

Controllers.controller('LoginCtrl', ['$scope', '$http', function($scope, $http){
  $scope.status = '';

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
  };
}]);
