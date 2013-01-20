
'use strict';

ANGULARCVApp.controller('EducationIndexCtrl', function($scope, $routeParams, $http) {
  $http.get('/api/educations/').success(function(data) {
    $scope.education = data;
  });
});
