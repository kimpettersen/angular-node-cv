describe('Admin page me items', function(){

  beforeEach(function() {
    browser().navigateTo('/#/login');
    input('user.username').enter('admin');
    input('user.password').enter('1234');

    element('#login-button').click();
  });

  describe('Button behaviour', function(){
    it('should have create enabled and edit/clear disabled as default', function(){
      expect(element('#me .create-button').prop('disabled')).toBeFalsy();
      expect(element('#me .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#me .edit-button').prop('disabled')).toBeTruthy();
      expect(element('#me .mode-field').html()).toContain('CREATE MODE');
    });

    it('should have edit/clear enabled and create disabled when editing', function(){
      element('#me .show-item-button').click();
      expect(element('#me .mode-field').html()).toContain('EDIT MODE');

      expect(element('#me .create-button').prop('disabled')).toBeTruthy();
      expect(element('#me .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#me .edit-button').prop('disabled')).toBeFalsy();
    });

    it('should remove current item when pressing clear', function(){
      element('#me .show-item-button').click();
      expect(element('#me .mode-field').html()).toContain('EDIT MODE');

      expect(element('#me .create-button').prop('disabled')).toBeTruthy();
      expect(element('#me .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#me .edit-button').prop('disabled')).toBeFalsy();

      element('#me .clear-button').click();

      expect(element('#me .mode-field').html()).toContain('CREATE MODE');

      expect(element('#me .create-button').prop('disabled')).toBeFalsy();
      expect(element('#me .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#me .edit-button').prop('disabled')).toBeTruthy();

    });
  });

  describe('Testing me admin', function(){

    it('should delete a tag if removed is pressed', function(){
      element('#me .show-item-button').click();
      expect(element('#me .item-tag').count()).toBe(2);
      expect(element('#me .item-tag').html()).toContain('me tag');
      element('#me .item-tag .btn').click();
      expect(element('#me .item-tag').count()).toBe(0);
    });


    it('should delete an item if delete is clicked', function(){
      element('#me-item .delete-item-button').click();
      expect(element('#me .edit-status').html()).toContain('Succesfully deleted item');
      expect(element('#me .resource-list > show-item-button').count()).toBe(0);
    });

    it('should create an item when clicking create', function(){
      input('adminService.me.item.title').enter('me title');
      input('adminService.me.item.description').enter('me description');
      input('me.tag').enter('me tag1');
      element('#me .tag-button').click();
      input('me.tag').enter('me tag2');
      element('#me .tag-button').click();

      element('#me .create-button').click();
      expect(element('#me .edit-status').html()).toContain('Succesfully created a new me');

      element('#me .show-item-button').click();

      expect(element('#me-item .item-title').html()).toContain('me title');
      expect(element('#me-item .item-description').html()).toContain('me description');
      expect(element('#me-item .item-tag').count()).toBe(2);
      expect(element('#me-item .item-tag').html()).toContain('me tag1');
    });

    it('should have elements in resource list', function(){
      expect(element('#me .resource-list > div').count()).toBeGreaterThan(0);
    });

    it('Should display the element when clicking show', function(){
      element('#me .show-item-button').click();
      expect(element('#me-item .item-title').html()).toContain('me title');
      expect(element('#me-item .item-description').html()).toContain('me description');
      expect(element('#me-item .item-tag').count()).toBe(2);
      expect(element('#me-item .item-tag').html()).toContain('me tag1');
    });

    it('should edit the item when pressing save', function(){
      element('#me .show-item-button').click();
      element('#me .item-tag .btn').click();
      input('adminService.me.item.title').enter('title2');
      input('adminService.me.item.description').enter('desc2');
      input('me.tag').enter('me tag3');
      element('#me .tag-button').click();
      input('me.tag').enter('me tag4');
      element('#me .tag-button').click();

      element('#me .edit-button').click();
      expect(element('#me .edit-status').html()).toContain('Succesfully edited me');

      expect(element('#me-item .item-title').html()).toContain('title2');
      expect(element('#me-item .item-description').html()).toContain('desc2');
      expect(element('#me-item .item-tag').count()).toBe(2);
      expect(element('#me-item .item-tag').html()).toContain('me tag3');

    });

  });
});
