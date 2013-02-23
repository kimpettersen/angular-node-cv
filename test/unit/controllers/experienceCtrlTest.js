'use strict';
describe('Controller: ExperienceCtrl', function() {
  var $httpBackend,
      Edu,
      ctrl,
      scope;

  beforeEach(module('CVApp'));
  beforeEach(module('controllers'));

  beforeEach(inject(function(_$httpBackend_, adminService) {
  $httpBackend = _$httpBackend_;

  $httpBackend.whenGET('/api/experience')
    .respond([
      {_id: '123'}]);
  }));

  beforeEach(inject(function($rootScope, $controller, adminService) {
    scope = $rootScope.$new();
    ctrl = $controller('ExperienceCtrl', {
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

    it('should have a mode variable', function() {
      expect(scope.mode).toBeDefined();
    });
  });

  describe('Add and remove tags', function(){
    it('should add a tag to currentItem object on addTag()', function(){
      scope.addTag('new-tag');
      expect(scope.currentItem.tags).toContain('new-tag')
    });

    it('should remove a tag from currentItem object on removeTag()', function(){
      scope.addTag('new-tag');
      expect(scope.currentItem.tags).toContain('new-tag')
      scope.removeTag('new-tag');
      expect(scope.currentItem.tags).not.toContain('new-tag')
    });
  });

  describe('reset functions', function(){
    it('should have mode "create" if currentItem is empty', function(){
      //Trigger $watch
      scope.resetCurrent();
      scope.$digest();
      expect(scope.mode).toBe('create');
      expect(scope.isCreateMode()).toBe(true);
    });

    it('should have mode "edit" if currentItem is not empty', function(){
      scope.currentItem.test = 'test';
      scope.$digest();
      expect(scope.mode).toBe('edit');
      expect(scope.isCreateMode()).toBe(false);
    });
  });
});
