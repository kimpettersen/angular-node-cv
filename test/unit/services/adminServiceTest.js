'use strict';

describe('AdminService', function() {
  var $httpBackend;

  beforeEach(angular.mock.module('CVApp'));

  beforeEach(module('adminServices'));
    beforeEach(inject(function(_$httpBackend_, adminService) {
      $httpBackend = _$httpBackend_;

      $httpBackend.whenGET('/api/bucketlist').
        respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);
      $httpBackend.whenGET('/api/education').
        respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);

      $httpBackend.whenGET('/api/experience').
        respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);

      $httpBackend.whenGET('/api/me').
        respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);

      $httpBackend.whenGET('/api/user').
        respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);

      $httpBackend.whenPOST('/api/education', undefined)
        .respond({status: 500, data: { error: 'the error message' }});
      $httpBackend.whenPOST('/api/education')
        .respond();
  }));

  // it('fail', function(){
  //   expect(adminService.bucketlist.resource).toBeUndefined();
  // });

  describe('initial state', function(){
    it('should contain an adminService', inject(function(adminService){
      expect(adminService).not.toBe(undefined);
    }));

    it('should have an empty resourcelist', inject(function(adminService){
      expect(adminService.bucketlist.resource.query()).toEqual([]);
      expect(adminService.education.resource.query()).toEqual([]);
      expect(adminService.experience.resource.query()).toEqual([]);
      expect(adminService.me.resource.query()).toEqual([]);
      expect(adminService.user.resource.query()).toEqual([]);
    }));


    it('should update the passed objects resource list', inject(function(adminService){

      // Testing with bucketlist
      adminService.updateResources('bucketlist');
      $httpBackend.flush();
      expect(adminService.bucketlist.resources.length).toBe(2);
      expect(adminService.bucketlist.resources[0].title).toBeDefined();

    }));
  });

  describe('Create, update and delete', function(){
    it('should return the object with the matching id and type', inject(function(adminService){

      // Testing with bucketlist
      adminService.updateResources('bucketlist');
      expect(adminService.findById( {id: '123', type: 'bucketlist' } ))
        .toBeUndefined();
      $httpBackend.flush();

      expect(adminService.findById( {id: '123', type: 'bucketlist' } ).title)
        .toBeDefined();

      expect(adminService.findById( {id: '123', type: 'bucketlist' } ).title)
        .toBe('REST');
    }));

    // it('should create a new resource and return Succesfully created a new <type>', inject(function(adminService){
    //   adminService.createResource({ item: {}, type: 'bucketlist' }, function(res){
    //     $httpBackend.flush();
    //     expect(res).toBe('You need to specify an item and type {item: {}, type: String}');
    //   });
    // }));

  });

});
