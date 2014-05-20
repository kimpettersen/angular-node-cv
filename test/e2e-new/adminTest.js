describe('Given I am on the Admin page', function() {
  var baseUrl = 'http://localhost:3000/#/',
      ptor = protractor.getInstance(),
      institution = 'a institution',
      degree = 'a degree',
      description = 'a description',
      order = 1;

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

  function createEducationItem() {
    element(by.model('adminService.education.item.institution')).sendKeys(institution);
    element(by.model('adminService.education.item.degree')).sendKeys(degree);
    element(by.model('adminService.education.item.description')).sendKeys(description);
    element(by.model('adminService.education.item.order')).sendKeys(order);
    element(by.css('#education .create-button')).click();
  }

  function removeItems(name) {
    $('#' + name + ' .resource-list .delete-item-button').click();
  }

  beforeEach(function(){
    login();
    browser.get(baseUrl + 'admin');
  });

  afterEach(function(){
    logout();
  });

  it('should NOT have the initial test data', function() {
    // Remove initial test data used to test the API
    $('#education .resource-list .delete-item-button').click();
    expect(element.all(by.css('#education .resource-list > div')).count()).toBe(0);
  });

  describe('When I create a new EDUCATION item', function() {
    var institution = 'a institution',
        degree = 'a degree',
        description = 'a description',
        order = 1;

    beforeEach(function(){
      createEducationItem();
    });

    afterEach(function() {
      removeItems('education')
    });

    it('should add the item to the resource list', function() {
      expect(element.all(by.css('#education .resource-list > div')).count()).toBe(1);
    });

    it('should add a resource with the right fields', function() {
      element(by.css('#education .resource-list .resource-name')).getText().then(function(text){
        expect(text).toContain(institution);
      });
    });
  });

  describe('When I want to DELETE an education item', function() {

    beforeEach(function(){
      createEducationItem();
    });

    it('should delete an item', function() {
      removeItems('education');
      expect(element.all(by.css('#education .resource-list > div')).count()).toBe(0);
    });
  });

  describe('When I want to EDIT an item', function() {
    beforeEach(function() {
      createEducationItem();
      element(by.css('#education .resource-list .show-item-button')).click();
    });

    afterEach(function() {
      removeItems('education');
    });

    describe('When I select an item to edit', function() {
      it('should fill in the form', function() {
        expect(element(by.model('adminService.education.item.institution')).getAttribute('value')).toContain(institution);
        expect(element(by.model('adminService.education.item.degree')).getAttribute('value')).toContain(degree);
        expect(element(by.model('adminService.education.item.description')).getAttribute('value')).toContain(description);
        expect(element(by.model('adminService.education.item.order')).getAttribute('value')).toContain(order);
      });
    });

    describe('When I change the fields', function() {
      var institution = 'new institution',
          degree = 'new degree',
          description = 'new description',
          order = 2;

      beforeEach(function(){
        element(by.css('#education .edit-button')).click();
        element(by.model('adminService.education.item.institution')).sendKeys(institution);
        element(by.model('adminService.education.item.degree')).sendKeys(degree);
        element(by.model('adminService.education.item.description')).sendKeys(description);
        element(by.model('adminService.education.item.order')).sendKeys(order);
        // Do the edit
        element(by.css('#education .edit-button')).click();
        //Clear the form
        element(by.css('#education .clear-button')).click();
        //Display it again
        element(by.css('#education .resource-list .show-item-button')).click();

      });

      it('should have changed the entry' , function() {
        expect(element(by.model('adminService.education.item.institution')).getAttribute('value')).toContain(institution);
        expect(element(by.model('adminService.education.item.degree')).getAttribute('value')).toContain(degree);
        expect(element(by.model('adminService.education.item.description')).getAttribute('value')).toContain(description);
        expect(element(by.model('adminService.education.item.order')).getAttribute('value')).toContain(order);
      });

    });
  });

  describe('When I want to clear the form', function() {

  });

});
