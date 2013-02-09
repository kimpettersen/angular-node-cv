
'use strict';

CVApp.controller('UserCtrl', function($scope, User) {
  $scope.master = {};

  $scope.update = function(user){
    $scope.master = angular.copy(user);

    User.save($scope.master, function(User){
      $scope.saved = 'Saved!';
    });
  };

  $scope.reset = function(){
    $scope.user = angular.copy($scope.master);
  };

});
