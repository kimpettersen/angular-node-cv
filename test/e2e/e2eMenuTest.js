describe('Testing routes', function() {


  beforeEach(function() {
    browser().navigateTo('/#/login');
  });

  describe('Displaying login functionality', function(){
    it('should display login button when not logged in', function(){
      element('#logout-nav-button').click();
      expect(element('.login-button:visible').count()).toBe(1);
      expect(element('.logout-button:visible').count()).toBe(0);
    });

    it('should not display logout button when not logged in', function(){
      input('user.username').enter('admin');
      input('user.password').enter('1234');
      element('#login-button').click();

      expect(element('.login-button:visible').count()).toBe(0);
      expect(element('.logout-button:visible').count()).toBe(1);
    });
  });

  describe('active page functionality', function(){
    it('should have an active menu element class when active', function(){
      browser().navigateTo('/#/login');
      expect(element('.login-button').prop('class')).toContain('active');
    });
  });

});
