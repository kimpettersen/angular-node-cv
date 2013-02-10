
'use strict';

CVApp.controller('BucketlistCtrl', function( $scope, Bucketlist) {
  $scope.ratings = [1, 2, 3, 4, 5];
  $scope.resources = [];
  $scope.currentItem = {};

  $scope.updateResources = function(){
    $scope.resources = Bucketlist.query();
  };

  $scope.findById = function(id){
    for (var i = 0; i < $scope.resources.length; i++){
      if ($scope.resources[i]._id === id){
        return $scope.resources[i];
      }
    }
  };

  $scope.showItem = function(id){
    $scope.currentItem = findById(id);
  };

  $scope.create = function (bucket){
    Bucketlist.save(angular.copy(bucket), function(){
      $scope.updateResources();
    });
  };

  $scope.editItem = function (bucket){
    var item = angular.copy(bucket);
    if (!item.hasOwnProperty('_id')){
      alert('Can not modify non existing item');
    }
    Bucketlist.edit(item, function(res){
      $scope.updateResources();
    });
  };


  $scope.edit = function(id){
    $scope.bucket = $scope.findById(id);
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
        display: '@',
        edit: '&',
        del: '&'
      },
      template: '<div ng-repeat="elem in list">Name: {{ elem[display] }}' +
                ' <button ng-click="edit({ item: elem._id })">Edit</button> ' +
                ' <button ng-click="del({ item: elem._id })">Delete</button> ' +
                '</div>'
    };
  });
