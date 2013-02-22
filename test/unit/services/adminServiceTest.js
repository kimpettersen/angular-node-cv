'use strict';

describe('AdminService', function() {
  var $httpBackend;

  beforeEach(angular.mock.module('CVApp'));

  beforeEach(module('adminServices'));
    beforeEach(inject(function(_$httpBackend_, adminService) {
      $httpBackend = _$httpBackend_;

      $httpBackend.whenGET('/api/bucketlist')
        .respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);
      $httpBackend.whenGET('/api/education')
        .respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);

      $httpBackend.whenGET('/api/experience')
        .respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);

      $httpBackend.whenGET('/api/me')
        .respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);

      $httpBackend.whenGET('/api/user')
        .respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);

      $httpBackend.whenPOST('/api/education', undefined)
        .respond({status: 500, data: '{ error: "the error message" }'});

      $httpBackend.whenPOST('/api/experience/123')
        .respond('success');

      $httpBackend.whenPUT('/api/education', undefined)
        .respond({status: 500, data: '{ error: "the error message" }'});

      $httpBackend.whenPUT('/api/experience/123')
        .respond({});

      $httpBackend.whenDELETE('/api/education', undefined)
        .respond({status: 500, data: '{ error: "the error message" }'});

      $httpBackend.whenDELETE('/api/experience/123')
        .respond({});

    }));

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

  describe('Create and update functionality', function(){
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


    // POST
    it('should return error message if wrong params are passed', inject(function(adminService){
      adminService.createResource({type: {}}, function(res){
        expect(res).toBe('You need to specify an item and type {item: {}, type: String}');
      });

      adminService.createResource({item: {}}, function(res){
        expect(res).toBe('You need to specify an item and type {item: {}, type: String}');
      });
    }));

    it('should return Succesfully created a new <type>', inject(function(adminService){
      adminService.createResource({item: {_id: '123', institution: 'Oslo'}, type: 'experience'}, function(res){
        expect(res).toBe('Succesfully created a new experience');
      });
    }));

    describe('Update functionality', function(){
      it('should return error message if wrong params are passed', inject(function(adminService){
        adminService.editResource({type: {}}, function(res){
          expect(res).toBe('You need to specify an item and type {item: {}, type: String}');
        });

        adminService.editResource({item: {}}, function(res){
          expect(res).toBe('You need to specify an item and type {item: {}, type: String}');
        });

        adminService.editResource({item: {}, type: 'education'}, function(res){
          expect(res).toBe('Can not modify non existing item');
        });
      }));
    })

    describe('Delete functionality', function(){
      it('should return the edited item when edited', inject(function(adminService){
        adminService.editResource({item: {_id: '123'}, type: 'experience'}, function(res){
           expect('Succesfully edited experience');
        });
      }));

      //delete
      it('should return error message if wrong params are passed', inject(function(adminService){
        adminService.delItem({type: {}}, function(res){
          expect(res).toBe('You need to specify an item and type {item: {}, type: String}');
        });

        adminService.delItem({id: {}}, function(res){
          expect(res).toBe('You need to specify an item and type {item: {}, type: String}');
        });

      }));

      it('should return "Succesfully deleted item" params are passed', inject(function(adminService){
        adminService.delItem({id: '123', type: 'experience'}, function(res){
          expect(res).toBe('Succesfully deleted item')
        });
      }));

    })
  });
});
