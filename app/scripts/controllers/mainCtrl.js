'use strict';

Controllers.controller('MainCtrl', ['$scope', 'mainService', function($scope, mainService){

  $scope.about = mainService.get({type: 'me'});
  $scope.education = mainService.get({type: 'education'});
  $scope.experience = mainService.get({type: 'experience'});
  $scope.bucketlist = mainService.get({type: 'bucketlist'});
}]);
