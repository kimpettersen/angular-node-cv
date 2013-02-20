'use strict';

CVApp.controller('MainCtrl', function($scope, mainService) {
  $scope.about = mainService.get({type: 'me'});
  $scope.education = mainService.get({type: 'education'});
  $scope.experience = mainService.get({type: 'experience'});
  $scope.bucketlist = mainService.get({type: 'bucketlist'});

console.log(mainService.get({type: 'bucketlist'}));
});
