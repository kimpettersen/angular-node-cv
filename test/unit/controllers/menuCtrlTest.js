'use strict';
describe('Controller: BucketlistCtrl', function() {
  var $httpBackend,
      ctrl,
      scope;

  beforeEach(module('CVApp'));
  beforeEach(module('controllers'));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function($rootScope, $controller, $location, $http) {
    scope = $rootScope.$new();
    ctrl = $controller('MenuCtrl', {
      $scope: scope,
      $location: $location,
      $http: $http
    });
  }));

  describe('Logout', function(){
    it('shoul log a user out', function() {

    });

  });
});
