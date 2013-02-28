describe('Testing routes', function() {
  // var scope,
  //     browser,
  //     location;

  // beforeEach(angular.mock.module('CVApp'));

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
    browser().navigateTo('/#/login');

  });

  describe('Initial state', function(){
    it('should have status blank', function(){
      expect(element('#status').text()).toEqual(' ');
    });
  });

  describe('Submitting', function(){
    it('should have status "Fields can not be blank" when submitting blank', function(){
      element('#login-button').click();
      expect(element('#status').text()).toContain('Fields can not be blank');

      input('user.username').enter('admin');
      element('#login-button').click();
      expect(element('#status').text()).toContain('Fields can not be blank');

      input('user.username').enter('');
      input('user.password').enter('admin');
      expect(element('#status').text()).toContain('Fields can not be blank');
    });

    it('should have status "" wrong username or password', function(){
      input('user.username').enter('wrong');
      input('user.password').enter('wrong');

      element('#login-button').click();
      expect(element('#status').text()).toContain('Wrong username or password');

      input('user.username').enter('admin');
      input('user.password').enter('wrong');
      element('#login-button').click();
      expect(element('#status').text()).toContain('Wrong username or password');

      input('user.username').enter('wrong');
      input('user.password').enter('1234');
      element('#login-button').click();
      expect(element('#status').text()).toContain('Wrong username or password');

    });

    it('should display log in if right username and password', function(){
      input('user.username').enter('admin');
      input('user.password').enter('1234');
      element('#login-button').click();
      expect(element('#status').text()).toContain('Succesful login');
    });
  });

  describe('Access admin', function(){

    it('should redirect to / if user access admin without being logged in', function(){

      browser().navigateTo('/#/admin');
      expect(browser().location().path()).toBe('/login');
      element('.admin-button').click();
      expect(browser().location().path()).toBe('/login');
    });

    it('should open admin if user is logged in', function(){
      input('user.username').enter('admin');
      input('user.password').enter('1234');
      element('#login-button').click();
      expect(element('#status').text()).toContain('Succesful login');
      element('.admin-button').click();
      expect(browser().location().path()).toBe('/admin');
    });

  });


});
