
'use strict';

CVApp.controller('AdminCtrl', function($scope){
  $scope.templates =
    [ { name: 'Bucketlist', url: '#/admin/bucketlist.html'},
      { name: 'Education', url: '#/admin/education.html'},
      { name: 'Experience', url: '#/admin/experience.html'}, 
      { name: 'Me', url: '#/admin/me.html'},
      { name: 'User', url: '#/admin/user.html'} ];
  $scope.template = $scope.templates[0];
  
  $scope.switchTemplate = function(index){
    $scope.template = $scope.templates[index];
  };

});