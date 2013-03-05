'use strict';
describe('Controller: UserCtrl', function() {
  var $httpBackend,
      UserCtrl,
      ctrl,
      scope;

  beforeEach(module('CVApp'));
  beforeEach(module('controllers'));

  beforeEach(inject(function(_$httpBackend_) {
  $httpBackend = _$httpBackend_;

  $httpBackend.whenGET('/api/user')
    .respond([
      {_id: '123', title: 'Angular', description: 'desc2', rating: '1'}]);
  }));

  beforeEach(inject(function($rootScope, $controller, CVServiceMock) {
    var adminServiceInst = new CVServiceMock.adminService('user');
    scope = $rootScope.$new();
    ctrl = $controller('UserCtrl', {
      $scope: scope,
      adminService: adminServiceInst
    });
  }));

  describe('Initial state', function(){
    it('should have an empty currentItem object', function() {
      expect(scope.currentItem).toEqual({});
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
   describe('edit functionality', function(){

    it('should set mode to edit when edit is called', function(){
      expect(scope.mode).toEqual('create');
      scope.edit();
      expect(scope.mode).toEqual('edit');
    });

    it('should set currentItem to the one selected', function(){
      var item = {
        item: 'myItem'
      }
      expect(scope.currentItem).toEqual({});
      scope.edit(item);
      expect(scope.currentItem).toEqual(item);
    });

    it('should call adminService.editResource set $scope.status to the returned response', function(){
      var item = {
        message: 'my message'
      }
      expect(scope.status).toEqual('');
      scope.editResource(item);
      expect(scope.status).toEqual('my message');
    });
  });

  describe('delete functionaluty', function(){
    it('should delete a item and set $scope.status to the proper message', function(){
      var item = {
        message: 'my message'
      }
      expect(scope.status).toEqual('');
      scope.del(item);
      expect(scope.status).toEqual('my message');
    });
  });

  describe('reset functionality', function(){
    it('should set currentItem to {}', function(){
      scope.currentItem = {hei: 'hello'};
      scope.resetCurrent();
      expect(scope.currentItem).toEqual({});
    });

    it('should set mode to create', function(){
      scope.mode = 'edit';
      scope.resetCurrent();
      expect(scope.mode).toEqual('create');
    });

    it('should set the model adminService.user.item to {}', function(){
      scope.adminService.user.item = { hallo:'123' };
      scope.resetCurrent();
      expect(scope.adminService.user.item).toEqual({});
    });
  });

  describe('create functionaluty', function(){
    it('should create a item and get a proper error message back', function(){
      var item = {
        message: 'my message'
      }

      scope.createResource(item);
      expect(scope.status).toEqual('my message');
    });
  });

  describe('isCreated', function(){
    it('should return true if $scope.mode is "create"', function(){
      scope.mode = 'create';
      expect(scope.isCreateMode()).toBe(true);
    });

    it('should return false if $scope.mode is "edit"', function(){
      scope.mode = 'edit';
      expect(scope.isCreateMode()).toBe(false);
    });
  });
});
