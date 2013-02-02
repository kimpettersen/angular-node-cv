
'use strict';

CVApp.controller('EducationIndexCtrl', function($scope, Education) {
  $scope.educations = Education.query();

  // Education.get({'id': '510d66c513b24f484e000002'}, function(education){
  //   $scope.education = education;
  // });
});
