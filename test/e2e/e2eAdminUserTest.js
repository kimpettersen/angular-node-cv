describe('Admin page user items', function(){
  var username;
  describe('Button behaviour', function(){
    it('should have create enabled and edit/clear disabled as default', function(){
      expect(element('#user .create-button').prop('disabled')).toBeFalsy();
      expect(element('#user .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#user .edit-button').prop('disabled')).toBeTruthy();
      expect(element('#user .mode-field').html()).toContain('CREATE MODE');
    });

    it('should have edit/clear enabled and create disabled when editing', function(){
      element('#user .show-item-button').click();
      expect(element('#user .mode-field').html()).toContain('EDIT MODE');

      expect(element('#user .create-button').prop('disabled')).toBeTruthy();
      expect(element('#user .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#user .edit-button').prop('disabled')).toBeFalsy();
    });

    it('should remove current item when pressing clear', function(){
      element('#user .show-item-button').click();
      expect(element('#user .mode-field').html()).toContain('EDIT MODE');

      expect(element('#user .create-button').prop('disabled')).toBeTruthy();
      expect(element('#user .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#user .edit-button').prop('disabled')).toBeFalsy();

      element('#user .clear-button').click();

      expect(element('#user .mode-field').html()).toContain('CREATE MODE');

      expect(element('#user .create-button').prop('disabled')).toBeFalsy();
      expect(element('#user .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#user .edit-button').prop('disabled')).toBeTruthy();

    });
  });

  describe('Testing user admin', function(){

    it('should set up db for user tests ', function(){
      browser().navigateTo('/#/admin');
      // Create a test user since the isDeleted flag is a mess

      input('adminService.user.item.username').enter('aaaaa');
      input('adminService.user.item.password').enter(1234);
      element('#user .create-button').click();
      expect(element('#user .edit-status').html()).toContain('Succesfully created a new user');
    });


    it('should delete an item if delete is clicked', function(){
      //Makes sure to pick the last item
      element('#user .delete-item-button:last').click();
      expect(element('#user .edit-status').html()).toContain('Succesfully deleted item');
    });

    it('should create an item when clicking create', function(){
      // create random user, or else the test will only run once
      username = Math.floor(Math.random() * 100);
      input('adminService.user.item.username').enter('admin' + username);
      input('adminService.user.item.password').enter('1234');
      element('#user .create-button').click();
      expect(element('#user .edit-status').html()).toContain('Succesfully created a new user');

      element('#user .show-item-button').click();

      expect(element('#user-item .item-username').html()).toContain(username);
      expect(element('#user-item .item-password').html()).toContain('1234');
    });

    it('should have elements in resource list', function(){
      expect(element('#user .resource-list > div').count()).toBeGreaterThan(0);
    });

    it('Should display the element when clicking show', function(){
      element('#user .show-item-button').click();
      expect(element('#user-item .item-username').html()).toContain(username);
      expect(element('#user-item .item-password').html()).toContain('1234');
    });

    it('should edit the item when pressing save', function(){
      element('#user .show-item-button').click();
      input('adminService.user.item.username').enter('user2');
      input('adminService.user.item.password').enter('pass2');

      element('#user .edit-button').click();
      expect(element('#user .edit-status').html()).toContain('Succesfully edited user');

      expect(element('#user-item .item-username').html()).toContain('user2');
      expect(element('#user-item .item-password').html()).toContain('pass2');
    });



  });
});
