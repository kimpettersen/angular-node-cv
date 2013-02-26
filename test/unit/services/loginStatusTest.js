'use strict';

describe('LoginService', function() {
  var $httpBackend;

  beforeEach(angular.mock.module('CVApp'));

  beforeEach(module('mainServices'));
    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

  describe('Update status', function(){
    it('should have loggedIn = false when 403', inject(function(loginService){
      $httpBackend.whenGET('/auth/userstatus')
        .respond(403, '');
      loginService.updateStatus();
      $httpBackend.flush();
      expect(loginService.loggedIn).toBe(false);
    }));

    it('should have logged in = true when loggen in', inject(function(loginService){
      $httpBackend.whenGET('/auth/userstatus')
        .respond(200, '');
      loginService.updateStatus();
      $httpBackend.flush();
      expect(loginService.loggedIn).toBe(true);
    }));
  });

});
