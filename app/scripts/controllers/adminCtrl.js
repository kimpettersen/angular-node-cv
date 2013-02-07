
'use strict';

CVApp.controller('AdminCtrl', function($scope){
  $scope.templates =
    [ { name: 'Bucketlist', url: '/#/admin/bucketlist.html'},
      { name: 'Education', url: '/#/admin/education.html'},
      { name: 'Experience', url: '/#/admin/experience.html'}, 
      { name: 'Me', url: 'me.html'},
      { name: 'User', url: 'user.html'} ];
  $scope.template = $scope.templates[0];

  $scope.changeTemplate = function(index){
    console.log('sdfsdf')
    $scope.template = $scope.templates[index];
  };
});