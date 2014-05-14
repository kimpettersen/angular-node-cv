describe('Given I am a user', function() {
  var baseUrl = 'http://localhost:3000/#/',
    ptor = protractor.getInstance();

  function login(username, password) {
    username = username ? username : 'admin';
    password = password ? password : '1234';

    browser.get(baseUrl + 'login');
    element(by.model('user.username')).sendKeys(username);
    element(by.model('user.password')).sendKeys(password);
    element(by.css('#login-button')).click();
  }

  function logout() {
    element(by.css('#logout-nav-button')).click();
  }

  describe('When I am on the login page', function() {
    describe('And I log in with the RIGHT CREDENTIALS', function() {
      beforeEach(function() {
        login();
      });

      afterEach(function() {
        logout();
      });

      it('should be redirected to the admin page', function(){
        expect(ptor.getCurrentUrl()).toContain('admin');
      });
    });

    describe('And I log in with the WRONG CREDENTIALS', function() {
      beforeEach(function() {
        login('abc', 'abc');
      });

      it('should not redirect anywhere', function() {
        expect(ptor.getCurrentUrl()).toContain('login');
      });

      it('should not allow me to access a restricted page', function() {
        browser.get(baseUrl + 'admin');
        expect(ptor.getCurrentUrl()).toContain('login');
      });
    });
  });

  describe('When I try to access a restricted page', function() {
    describe('And I AM NOT authenticated', function(){
      beforeEach(function(){
        browser.get(baseUrl + 'admin');
      });

      it('should redirect me to the login page', function() {
        expect(ptor.getCurrentUrl()).toContain('login');
      });
    });

    describe('And I AM authenticated', function(){
      beforeEach(function() {
        login();
      });

      afterEach(function() {
        logout();
      });

      it('should allow access to that page', function() {
        expect(ptor.getCurrentUrl()).toContain('admin');
      });
    });
  });

  describe('When I want to log out', function() {
    beforeEach(function() {
      login();
      logout();
    });

    it('should log me out', function() {
      browser.get(baseUrl + 'admin');
      expect(ptor.getCurrentUrl()).toContain('login');
    });

  });
});
