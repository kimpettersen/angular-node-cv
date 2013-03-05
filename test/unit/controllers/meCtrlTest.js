'use strict';
describe('Controller: MeCtrl', function() {
  var $httpBackend,
      Edu,
      ctrl,
      scope;

  beforeEach(module('CVApp'));
  beforeEach(module('controllers'));

  beforeEach(inject(function(_$httpBackend_) {
  $httpBackend = _$httpBackend_;

  $httpBackend.whenGET('/api/me')
    .respond([
      {_id: '123'}]);
  }));

  beforeEach(inject(function($rootScope, $controller, adminServiceMock) {
    var adminServiceInst = new adminServiceMock('me');
    scope = $rootScope.$new();
    ctrl = $controller('MeCtrl', {
      $scope: scope,
      adminService: adminServiceInst
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
      expect(scope.currentItem).toEqual({ tags : [  ] });
      scope.edit(item);
      expect(scope.currentItem).toEqual(item);
    });

    it('should call adminService.editResource set $scope.status to the returned response', function(){
      var options = {
        item: {
          _id: 2
        }
      }

      expect(scope.status).toEqual('');
      scope.editResource(options);
      expect(scope.status).toEqual('std message');
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
      expect(scope.currentItem).toEqual({ tags : [  ] });
    });

    it('should set mode to create', function(){
      scope.mode = 'edit';
      scope.resetCurrent();
      expect(scope.mode).toEqual('create');
    });

    it('should set the model adminService.me.item to {}', function(){
      scope.adminService.me.item = { hallo:'123' };
      scope.resetCurrent();
      expect(scope.adminService.me.item).toEqual({});
    });
  });

  describe('create functionaluty', function(){
    it('should create a item and get a proper error message back', function(){
      var options = {
        item: {
          tags: [1,2,3]
        }
      }
      scope.createResource(options);
      expect(scope.status).toEqual('std message');
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
