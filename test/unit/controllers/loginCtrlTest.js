'use strict';
describe('Controller: ExperienceCtrl', function() {
  var $httpBackend,
      ctrl,
      scope;

  beforeEach(module('CVApp'));
  beforeEach(module('controllers'));

  beforeEach(inject(function(_$httpBackend_, adminService) {
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function($rootScope, $controller, $http) {
    scope = $rootScope.$new();
    ctrl = $controller('LoginCtrl', {
      $scope: scope,
      $http: $http
    });
  }));

  describe('Initial state', function(){
    it('should have an empty status', function(){
      expect(scope.status).toBe('');
    })
  });

  describe('login action', function(){
    it('should display "Fields can not be blank if on of the fields are blank"', function(){
      var both = {},
          username = {password: '123'},
          password = {username: '123'};

      scope.login(both);
      expect(scope.status).toEqual('Fields can not be blank');
      scope.login(username);
      expect(scope.status).toEqual('Fields can not be blank');
      scope.login(password);
      expect(scope.status).toEqual('Fields can not be blank');
    });

    it('should display "Wrong username or password" when wrong username', function(){
      $httpBackend.whenPOST('/auth/login').respond('Wrong username or password');

      scope.login({username: 'wrong', password: '1234'});
      $httpBackend.flush();
      expect(scope.status).toEqual('Wrong username or password');

    });

    it('should display "Wrong username or password" when wrong password', function(){
      $httpBackend.whenPOST('/auth/login').respond('Wrong username or password');
      scope.login({username: 'admin', password: 'wrong'});
      $httpBackend.flush();
      expect(scope.status).toEqual('Wrong username or password');
    });

    it('shold display "Succesfull login", when OK data', function(){
      $httpBackend.whenPOST('/auth/login', { username: 'admin', password: '1234' })
      .respond('Succesfull login');
      scope.login({username: 'admin', password: '1234'});
      $httpBackend.flush();
      expect(scope.status).toEqual('Succesfull login');
    });

    it('should display "Server could not log in user" isn\'t 200', function(){
      $httpBackend.whenPOST('/auth/login', { username: 'admin', password: '1234' })
      .respond(204, '');
      scope.login({username: 'admin', password: '1234'});
      $httpBackend.flush();
      expect(scope.status).toEqual('Server could not log in user');
    });
  })
});
