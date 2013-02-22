'use strict';
describe('Controller: MeCtrl', function() {
  var $httpBackend,
      Edu,
      ctrl,
      scope;

  beforeEach(module('CVApp'));
  beforeEach(module('controllers'));

  beforeEach(inject(function(_$httpBackend_, adminService) {
  $httpBackend = _$httpBackend_;

  $httpBackend.whenGET('/api/me')
    .respond([
      {_id: '123'}]);
  }));

  beforeEach(inject(function($rootScope, $controller, adminService) {
    scope = $rootScope.$new();
    ctrl = $controller('MeCtrl', {
      $scope: scope,
      adminService: adminService
    });
  }));

  describe('Initial state', function(){
    it('should have a currentItem object', function() {
      expect(scope.currentItem).toBeDefined()
    });

    it('should have an currentItem.tags defned', function() {
      expect(scope.currentItem.tags).toBeDefined()
    });

    it('should have an empty status string', function() {
      expect(scope.status).toEqual('');
    });

    it('should have an adminService', function() {
      expect(scope.adminService).toBeDefined();
    });

    it('should add a tag to currentItem object on addTag()', function(){
      scope.addTag('new-tag');
      expect(scope.currentItem.tags).toContain('new-tag')
    })

    it('should remove a tag from currentItem object on removeTag()', function(){
      scope.addTag('new-tag');
      expect(scope.currentItem.tags).toContain('new-tag')
      scope.removeTag('new-tag');
      expect(scope.currentItem.tags).not.toContain('new-tag')
    })

  })
});
