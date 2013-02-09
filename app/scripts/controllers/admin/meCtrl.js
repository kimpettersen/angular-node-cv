
'use strict';

CVApp.controller('MeCtrl', function($scope, Me) {
  $scope.master = {};
  $scope.contacts = [];

  $scope.addContact = function(contact){
    $scope.contacts.push(contact);
  };

  $scope.update = function(me){
    me.contact = $scope.contacts;
    $scope.master = angular.copy(me);

    Me.save($scope.master, function(Me){
      $scope.saved = 'Saved!';
    });
  };

  $scope.reset = function(){
    $scope.me = angular.copy($scope.master);
  };

});
