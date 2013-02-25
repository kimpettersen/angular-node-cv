'use strict'

Controllers.controller('MenuCtrl', function($scope, $location, $http, $rootScope){

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
    $http.get('/auth/userstatus').success(function(res, status){
      if (status === 200){
        console.log('here');
        $scope.loggedIn = true;
      }else{
        $scope.loggedIn = false;
      }
    });
  }

  $scope.userstatus();

  $scope.$watch('loggedIn', function(){
    $rootScope.loggedIn = $scope.loggedIn;
  })
});
