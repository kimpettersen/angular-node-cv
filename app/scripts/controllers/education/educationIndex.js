
'use strict';

CVApp.controller('EducationIndexCtrl', function($scope, $routeParams, $http) {
  $http.get('/api/education/').success(function(data) {
    $scope.educations = data.result;
  });
});
