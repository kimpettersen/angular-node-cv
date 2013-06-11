'use strict';

Controllers.controller('CVCtrl', ['$scope', 'mainService', function($scope, mainService){

  $scope.about = mainService.get({type: 'me'});
  $scope.education = mainService.get({type: 'education'});
  $scope.experience = mainService.get({type: 'experience'});
  $scope.bucketlist = mainService.get({type: 'bucketlist'});

  $scope.showDiagram = function(){

  };
}]);

$(".fancybox").fancybox({
        prevEffect      : 'none',
        nextEffect      : 'none',
    });
