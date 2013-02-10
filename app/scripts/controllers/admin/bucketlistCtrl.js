
'use strict';

CVApp.controller('BucketlistCtrl', function( $scope, Bucketlist) {
  $scope.ratings = [1, 2, 3, 4, 5];
  $scope.resources = [];

  $scope.updateResources = function(){
    $scope.resources = Bucketlist.query();
  };

  $scope.resetForm = function (){
    $scope.bucket = [];
  };

  $scope.create = function (bucket){
    Bucketlist.save(angular.copy(bucket), function(){
      $scope.updateResources();
    });
  };

  $scope.editItem = function (bucket){
    Bucketlist.edit(bucket, function(res){
      console.log('Yup ', res);
      $scope.updateResources();
    });
  };


  $scope.edit = function(id){
    for (var i = 0; i < $scope.resources.length; i++){
      if($scope.resources[i]._id === id){
        $scope.bucket = $scope.resources[i];
      }
    }
  };

  $scope.del = function(id){
    Bucketlist.remove({ id: id }, function(){
      $scope.updateResources();
    });
  };
  $scope.updateResources();
});

CVApp.directive('resources', function (){
    return {
      scope: {
        list: '=',
        edit: '&',
        del: '&'
      },
      template: '<div ng-repeat="elem in list">Name: {{ elem.title }}' +
                ' <button ng-click="edit({ item: elem._id })">Edit</button> ' +
                ' <button ng-click="del({ item: elem._id })">Delete</button> ' +
                '</div>'
    };
  });
