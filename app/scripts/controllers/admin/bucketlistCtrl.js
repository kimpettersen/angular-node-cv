
'use strict';

CVApp.controller('BucketlistCtrl', function( $scope, adminService) {
  $scope.adminService = adminService;
  $scope.adminService.updateResources('bucketlist');
});

CVApp.directive('resources', function (){
    return {
      scope: {
        list: '=',
        display: '@',
        edit: '&',
        del: '&',
        type: '@'
      },
      template: '<div ng-repeat="elem in list">Name: {{ elem[display] }}' +
                ' <button ng-click="edit({ item: elem._id })">Edit</button> ' +
                ' <button ng-click="del({ item: {id: elem._id, type: type } })">Delete</button> ' +
                '</div>'
    };
  });
