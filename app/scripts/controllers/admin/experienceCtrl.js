
'use strict';

CVApp.controller('ExperienceCtrl', function($scope, Experience) {
  $scope.master = {};
  $scope.tags = [];
  $scope.projects = [];

  $scope.addTag = function(tag){
    $scope.tags.push(tag);
  };

  $scope.addProject = function(title, project){
    $scope.projects.push({title: title, project: project});
  };


  $scope.update = function(experience){
    experience.tags = $scope.tags;
    experience.projects = $scope.projects;

    $scope.master = angular.copy(experience);

    Experience.save($scope.master, function(Experience){
      $scope.saved = 'Saved!';
    });
  };

  $scope.reset = function(){
    $scope.experience = angular.copy($scope.master);
  };

});
