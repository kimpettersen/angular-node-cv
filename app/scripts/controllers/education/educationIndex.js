
'use strict';

ANGULARCVApp.controller('EducationIndexCtrl', function($scope, $routeParams, $http) {
  $http.get('/api/education/index').success(function(data) {
    $scope.education = data;
  });
});
