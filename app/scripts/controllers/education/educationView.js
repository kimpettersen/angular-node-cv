
'use strict';

ANGULARCVApp.controller('EducationViewCtrl', function($scope, $routeParams, $http) {
  $http.get('/api/education/view/:id').success(function(data) {
    $scope.education = data;
  });
});
