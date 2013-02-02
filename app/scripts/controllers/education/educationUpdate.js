
'use strict';

CVApp.controller('EducationUpdateCtrl', function($scope, $routeParams, $http) {
  $http.get('/api/education/update/:id').success(function(data) {
    $scope.education = data;
  });
});
