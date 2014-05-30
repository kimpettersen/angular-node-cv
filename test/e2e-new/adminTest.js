describe('Given I am on the Admin page', function() {
  var baseUrl = 'http://localhost:3000/#/',
      ptor = protractor.getInstance(),
      institution = 'a institution',
      degree = 'a degree',
      description = 'a description',
      order = 1,
      company = 'a company',
      title = 'a title',
      duration = 'from - to',
      username = 'admin',
      password = '1234';

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

  function createExperienceItem() {
    element(by.model('adminService.experience.item.company')).sendKeys(company);
    element(by.model('adminService.experience.item.duration')).sendKeys(duration);
    element(by.model('adminService.experience.item.description')).sendKeys(description);
    element(by.model('adminService.experience.item.order')).sendKeys(order);
    element(by.css('#experience .create-button')).click();
  }

  function createMeItem() {
    element(by.model('adminService.me.item.title')).sendKeys(title);
    element(by.model('adminService.me.item.description')).sendKeys(description);
    element(by.model('adminService.me.item.order')).sendKeys(order);
    element(by.css('#me .create-button')).click();
  }

  function createUserItem() {
    element(by.model('adminService.user.item.username')).sendKeys(username);
    element(by.model('adminService.user.item.password')).sendKeys(password);
    element(by.css('#user .create-button')).click();
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
    $('#experience .resource-list .delete-item-button').click();
    $('#me .resource-list .delete-item-button').click();

    expect(element.all(by.css('#education .resource-list > div')).count()).toBe(0);
    expect(element.all(by.css('#experience .resource-list > div')).count()).toBe(0);
    expect(element.all(by.css('#me .resource-list > div')).count()).toBe(0);
  });

  describe('When I create a new EDUCATION item', function() {
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
      var newInstitution = 'new institution',
          newDegree = 'new degree',
          newDescription = 'new description',
          newOrder = 2;

      beforeEach(function(){
        element(by.css('#education .clear-button')).click();
        element(by.css('#education .edit-button')).click();
        element(by.model('adminService.education.item.institution')).sendKeys(newInstitution);
        element(by.model('adminService.education.item.degree')).sendKeys(newDegree);
        element(by.model('adminService.education.item.description')).sendKeys(newDescription);
        element(by.model('adminService.education.item.order')).sendKeys(newOrder);
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
    beforeEach(function(){
      createEducationItem();
      element(by.css('#education .resource-list .show-item-button')).click();
      element(by.css('#education .clear-button')).click();
    });

    it('should have an empty form', function() {
      expect(element(by.model('adminService.education.item.institution')).getAttribute('value')).toEqual('');
      expect(element(by.model('adminService.education.item.degree')).getAttribute('value')).toEqual('');
      expect(element(by.model('adminService.education.item.description')).getAttribute('value')).toEqual('');
      expect(element(by.model('adminService.education.item.order')).getAttribute('value')).toEqual('');
    });
  });


////////////////////////////////////////////////////////////////////////////////////////////////////////////


  describe('When I create a new EXPERIENCE item', function() {
    beforeEach(function(){
      createExperienceItem();
    });

    afterEach(function() {
      removeItems('experience')
    });

    it('should add the item to the resource list', function() {
      expect(element.all(by.css('#experience .resource-list > div')).count()).toBe(1);
    });

    it('should add a resource with the right fields', function() {
      element(by.css('#experience .resource-list .resource-name')).getText().then(function(text){
        expect(text).toContain(company);
      });
    });
  });

  describe('When I want to DELETE an experience item', function() {

    beforeEach(function(){
      createExperienceItem();
    });

    it('should delete an item', function() {
      removeItems('experience');
      expect(element.all(by.css('#experience .resource-list > div')).count()).toBe(0);
    });
  });

  describe('When I want to EDIT an item', function() {
    beforeEach(function() {
      createExperienceItem();
      element(by.css('#experience .resource-list .show-item-button')).click();
    });

    afterEach(function() {
      removeItems('experience');
    });

    describe('When I select an item to edit', function() {
      it('should fill in the form', function() {
        expect(element(by.model('adminService.experience.item.company')).getAttribute('value')).toContain(company);
        expect(element(by.model('adminService.experience.item.duration')).getAttribute('value')).toContain(duration);
        expect(element(by.model('adminService.experience.item.description')).getAttribute('value')).toContain(description);
        expect(element(by.model('adminService.experience.item.order')).getAttribute('value')).toContain(order);
      });
    });

    describe('When I change the fields', function() {
      var newCompany = 'new company',
          newDuration = 'new duration',
          newDescription = 'new description',
          newOrder = 2;

      beforeEach(function(){
        element(by.css('#experience .clear-button')).click();
        element(by.css('#experience .edit-button')).click();
        element(by.model('adminService.experience.item.company')).sendKeys(newCompany);
        element(by.model('adminService.experience.item.duration')).sendKeys(newDuration);
        element(by.model('adminService.experience.item.description')).sendKeys(newDescription);
        element(by.model('adminService.experience.item.order')).sendKeys(newOrder);
        // Do the edit
        element(by.css('#experience .edit-button')).click();
        //Clear the form
        element(by.css('#experience .clear-button')).click();
        //Display it again
        element(by.css('#experience .resource-list .show-item-button')).click();

      });

      it('should have changed the entry' , function() {
        expect(element(by.model('adminService.experience.item.company')).getAttribute('value')).toContain(company);
        expect(element(by.model('adminService.experience.item.duration')).getAttribute('value')).toContain(duration);
        expect(element(by.model('adminService.experience.item.description')).getAttribute('value')).toContain(description);
        expect(element(by.model('adminService.experience.item.order')).getAttribute('value')).toContain(order);
      });

    });
  });

  describe('When I want to clear the form', function() {
    beforeEach(function(){
      createExperienceItem();
      element(by.css('#experience .resource-list .show-item-button')).click();
      element(by.css('#experience .clear-button')).click();
    });

    it('should have an empty form', function() {
      expect(element(by.model('adminService.experience.item.company')).getAttribute('value')).toEqual('');
      expect(element(by.model('adminService.experience.item.duration')).getAttribute('value')).toEqual('');
      expect(element(by.model('adminService.experience.item.description')).getAttribute('value')).toEqual('');
      expect(element(by.model('adminService.experience.item.order')).getAttribute('value')).toEqual('');
    });
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


  describe('When I create a new ME item', function() {
    beforeEach(function(){
      createMeItem();
    });

    afterEach(function() {
      removeItems('me')
    });

    it('should add the item to the resource list', function() {
      expect(element.all(by.css('#me .resource-list > div')).count()).toBe(1);
    });

    it('should add a resource with the right fields', function() {
      element(by.css('#me .resource-list .resource-name')).getText().then(function(text){
        expect(text).toContain(title);
      });
    });
  });

  describe('When I want to DELETE an me item', function() {

    beforeEach(function(){
      createMeItem();
    });

    it('should delete an item', function() {
      removeItems('me');
      expect(element.all(by.css('#me .resource-list > div')).count()).toBe(0);
    });
  });

  describe('When I want to EDIT an item', function() {
    beforeEach(function() {
      createMeItem();
      element(by.css('#me .resource-list .show-item-button')).click();
    });

    afterEach(function() {
      removeItems('me');
    });

    describe('When I select an item to edit', function() {
      it('should fill in the form', function() {
        expect(element(by.model('adminService.me.item.title')).getAttribute('value')).toContain(title);
        expect(element(by.model('adminService.me.item.description')).getAttribute('value')).toContain(description);
      });
    });

    describe('When I change the fields', function() {
      var newCompany = 'new title',
          newDuration = 'new duration',
          newDescription = 'new description',
          newOrder = 2;

      beforeEach(function(){
        element(by.css('#me .clear-button')).click();
        element(by.css('#me .edit-button')).click();
        element(by.model('adminService.me.item.title')).sendKeys(newCompany);
        element(by.model('adminService.me.item.description')).sendKeys(newDescription);
        // Do the edit
        element(by.css('#me .edit-button')).click();
        //Clear the form
        element(by.css('#me .clear-button')).click();
        //Display it again
        element(by.css('#me .resource-list .show-item-button')).click();

      });

      it('should have changed the entry' , function() {
        expect(element(by.model('adminService.me.item.title')).getAttribute('value')).toContain(title);
        expect(element(by.model('adminService.me.item.description')).getAttribute('value')).toContain(description);
      });

    });
  });

  describe('When I want to clear the form', function() {
    beforeEach(function(){
      createMeItem();
      element(by.css('#me .resource-list .show-item-button')).click();
      element(by.css('#me .clear-button')).click();
    });

    it('should have an empty form', function() {
      expect(element(by.model('adminService.me.item.title')).getAttribute('value')).toEqual('');
      expect(element(by.model('adminService.me.item.description')).getAttribute('value')).toEqual('');
    });
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // describe('When I create a new USER item', function() {
  //   beforeEach(function(){
  //     createUserItem();
  //   });

  //   afterEach(function() {
  //     removeItems('user')
  //   });

  //   it('should add the item to the resource list', function() {
  //     expect(element.all(by.css('#user .resource-list > div')).count()).toBe(1);
  //   });

  //   it('should add a resource with the right fields', function() {
  //     element(by.css('#user .resource-list .resource-name')).getText().then(function(text){
  //       expect(text).toContain(title);
  //     });
  //   });
  // });

  // describe('When I want to DELETE an me item', function() {

  //   beforeEach(function(){
  //     createUserItem();
  //   });

  //   it('should delete an item', function() {
  //     removeItems('user');
  //     expect(element.all(by.css('#user .resource-list > div')).count()).toBe(0);
  //   });
  // });

  // describe('When I want to EDIT an item', function() {
  //   beforeEach(function() {
  //     createUserItem();
  //     element(by.css('#user .resource-list .show-item-button')).click();
  //   });

  //   afterEach(function() {
  //     removeItems('user');
  //   });

  //   describe('When I select an item to edit', function() {
  //     it('should fill in the form', function() {
  //       expect(element(by.model('adminService.user.item.username')).getAttribute('value')).toContain(username);
  //       expect(element(by.model('adminService.user.item.password')).getAttribute('value')).toContain(password);
  //     });
  //   });

  //   describe('When I change the fields', function() {
  //     var newUsername = 'new username',
  //         newPassword = 'new password';

  //     beforeEach(function(){
  //       element(by.css('#user .clear-button')).click();
  //       element(by.css('#user .edit-button')).click();
  //       element(by.model('adminService.user.item.username')).sendKeys(newUsername);
  //       element(by.model('adminService.user.item.password')).sendKeys(newPassword);
  //       // Do the edit
  //       element(by.css('#user .edit-button')).click();
  //       //Clear the form
  //       element(by.css('#user .clear-button')).click();
  //       //Display it again
  //       element(by.css('#user .resource-list .show-item-button')).click();

  //     });

  //     it('should have changed the entry' , function() {
  //       expect(element(by.model('adminService.user.item.username')).getAttribute('value')).toContain(username);
  //       expect(element(by.model('adminService.user.item.password')).getAttribute('value')).toContain(password);
  //     });

  //   });
  // });

  // describe('When I want to clear the form', function() {
  //   beforeEach(function(){
  //     createUserItem();
  //     element(by.css('#user .resource-list .show-item-button')).click();
  //     element(by.css('#user .clear-button')).click();
  //   });

  //   it('should have an empty form', function() {
  //     expect(element(by.model('adminService.user.item.username')).getAttribute('value')).username('');
  //     expect(element(by.model('adminService.user.item.password')).getAttribute('value')).password('');
  //   });
  // });


});
