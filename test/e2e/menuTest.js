describe('Testing routes', function() {


  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  describe('Displaying login functionality', function(){
    it('should display login button when not logged in', function(){
      expect(element('.login-button').prop('disabled')).toBe(false);
    });

    it('should not display logout button when not logged in', function(){
      expect(element('.logout-button').prop('disabled')).toBe(true);
    });

    it('should not display login button when logged in', function(){
      expect(element('.login-button').prop('disabled')).toBe(true);
    });

    it('should display logout button when logged in', function(){
      expect(element('.logout-button').prop('disabled')).toBe(false);
    });

  });

  it('should redirect to / if user access admin without being logged in', function(){
    browser().navigateTo('/#/admin');
    expect(browser().location().path()).toBe('/#/');
  });

});
