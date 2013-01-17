
'use strict';

ANGULARCVApp.controller('EducationCreateCtrl', function($scope, $routeParams, $http) {
  $http.get('/api/education/create').success(function(data) {
    $scope.education = data;
  });
});
