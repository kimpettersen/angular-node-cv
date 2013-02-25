'use strict';
describe('Controller: MenuCtrl', function() {
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

  describe('Check if user is logged in', function(){
    it('should have loggedIn set to false if not logged in', function(){
      $httpBackend.whenGET('/auth/userstatus').respond(403, '');
      scope.userstatus();
      $httpBackend.flush();
      expect(scope.loggedIn).toBe(false);
    });

    it('should have loggedIn set to true if logged in', function(){
      $httpBackend.whenGET('/auth/userstatus').respond({status: 200, headers: { CVAppAuth: true } });
      scope.userstatus();
      $httpBackend.flush();
      expect(scope.loggedIn).toBe(true);
    });
  })

  describe('Logout', function(){
    it('shoul log a user out', function() {
      $httpBackend.whenGET('/auth/logout').respond(200, '');
      scope.logout()
      $httpBackend.flush();
      expect(scope.loggedIn).toBe(false);
    });
  });
});
