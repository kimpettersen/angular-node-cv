'use strict';
describe('Controller: BucketlistCtrl', function() {
  var $httpBackend,
      BucketlistCtrl,
      ctrl,
      scope;

  beforeEach(module('CVApp'));
  beforeEach(module('controllers'));

  beforeEach(inject(function(_$httpBackend_, adminService) {
  $httpBackend = _$httpBackend_;

  $httpBackend.whenGET('/api/bucketlist')
    .respond([
      {_id: '123', title: 'Angular', description: 'desc2', rating: '1'}]);
  }));

  beforeEach(inject(function($rootScope, $controller, adminService) {
    scope = $rootScope.$new();
    ctrl = $controller('BucketlistCtrl', {
      $scope: scope,
      adminService: adminService
    });
  }));

  describe('Initial state', function(){
    it('should have an empty currentItem object', function() {
      expect(scope.currentItem).toEqual({});
    });

    it('should have an Array ratings with numbers 1,2,3,4,5', function() {
      expect(scope.ratings).toEqual([1, 2, 3, 4, 5]);
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
  })

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
