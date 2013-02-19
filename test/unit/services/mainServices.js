'use strict';

describe('MainServices', function() {
  var $httpBackend;

  beforeEach(angular.mock.module('CVApp'));

  beforeEach(module('mainServices'));
    beforeEach(inject(function(_$httpBackend_, mainService) {
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
    }));

  describe('initial state', function(){
    it('should contain an mainService', inject(function(mainService){
      expect(mainService).not.toBe(undefined);
    }));

    it('should have an empty resourcelist', inject(function(mainService){
      expect(mainService.bucketlist.resource.query()).toEqual([]);
      expect(mainService.education.resource.query()).toEqual([]);
      expect(mainService.experience.resource.query()).toEqual([]);
      expect(mainService.me.resource.query()).toEqual([]);
      expect(mainService.user.resource.query()).toEqual([]);
    }));
  });

});
