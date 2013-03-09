'use strict';
describe('Controller: MenuCtrl', function() {
  var $httpBackend,
      ctrl,
      scope;

  beforeEach(module('CVApp'));
  beforeEach(module('controllers'));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('/auth/userstatus').respond(200, '');
  }));

  beforeEach(inject(function($rootScope, $controller, $location, $http) {
    scope = $rootScope.$new();
    ctrl = $controller('MenuCtrl', {
      $scope: scope,
      $location: $location,
      $http: $http
    });
  }));

  // describe('setting path', function(){
  //   // it('should set the browser path to the passed path', function(){
  //   //   expect(browser().location.path()).toEqual('/admin');
  //   //   scope.changeView('/main');

  //   // });
  // })

  describe('active menu functions', function(){
    it('should return active if passed name equals scope.activePage', function(){
      expect(scope.getActivePage('/admin')).toBe('active');
      expect(scope.getActivePage('/documentation')).toBe('');
    });
  });

});
