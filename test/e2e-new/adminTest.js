describe('Given I am on the Admin page', function() {
  beforeEach(function(){
    browser.get('http://localhost:3000/#/login');
    element(by.model('user.username')).sendKeys('asfsdf');
    element(by.model('user.password')).sendKeys('1234');
    element(by.css('#login-button')).click();
  });

  it('should have loaded the Admin page', function() {
    // expect(getLocationAbsUrl).toContain('admin');
  });
});
