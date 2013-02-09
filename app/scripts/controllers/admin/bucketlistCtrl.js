
'use strict';

CVApp.controller('BucketlistCtrl', function($scope, Bucketlist) {
  $scope.master = {};
  $scope.ratings = [1, 2, 3, 4, 5];

  $scope.update = function(bucketlist){
    $scope.master = angular.copy(bucketlist);
    Bucketlist.save($scope.master, function(Bucketlist){
      $scope.saved = 'Saved!';
    });
  };

  $scope.reset = function(){
    $scope.bucketlist = angular.copy($scope.master);
  };

});
