'use strict';

describe('AdminService', function() {
  var $httpBackend;

  beforeEach(angular.mock.module('CVApp'));

  beforeEach(module('adminServices'));
    beforeEach(inject(function(_$httpBackend_, adminService) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/bucketlist').
        respond([
          {_id: '123', title: 'REST', description: 'desc', rating: '3'},
          {_id: '456', title: 'Angular', description: 'desc2', rating: '1'}]);
  }));

  // it('fail', function(){
  //   expect(adminService.bucketlist.resource).toBeUndefined();
  // });

  it('should contain an adminService', inject(function(adminService){
    expect(adminService).not.toBe(undefined);
  }));

  it('should have an empty resourcelist', inject(function(adminService){
    expect(adminService.bucketlist).toBe([]);
  }));


});
