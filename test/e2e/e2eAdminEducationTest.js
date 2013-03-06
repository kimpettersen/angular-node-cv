describe('Admin page education items', function(){

  beforeEach(function() {
    browser().navigateTo('/#/login');
    input('user.username').enter('admin');
    input('user.password').enter('1234');

    element('#login-button').click();
    expect(element('#status').text()).toContain('Succesful login');
    browser().navigateTo('/#/admin');
  });

  describe('Button behaviour', function(){
    it('should have create enabled and edit/clear disabled as default', function(){
      expect(element('#education .create-button').prop('disabled')).toBeFalsy();
      expect(element('#education .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#education .edit-button').prop('disabled')).toBeTruthy();
      expect(element('#education .mode-field').html()).toContain('CREATE MODE');
    });

    it('should have edit/clear enabled and create disabled when editing', function(){
      element('#education .show-item-button').click();
      expect(element('#education .mode-field').html()).toContain('EDIT MODE');

      expect(element('#education .create-button').prop('disabled')).toBeTruthy();
      expect(element('#education .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#education .edit-button').prop('disabled')).toBeFalsy();
    });

    it('should remove current item when pressing clear', function(){
      element('#education .show-item-button').click();
      expect(element('#education .mode-field').html()).toContain('EDIT MODE');

      expect(element('#education .create-button').prop('disabled')).toBeTruthy();
      expect(element('#education .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#education .edit-button').prop('disabled')).toBeFalsy();

      element('#education .clear-button').click();

      expect(element('#education .mode-field').html()).toContain('CREATE MODE');

      expect(element('#education .create-button').prop('disabled')).toBeFalsy();
      expect(element('#education .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#education .edit-button').prop('disabled')).toBeTruthy();

    });
  });

  describe('Testing education admin', function(){

    it('should delete a tag if removed is pressed', function(){
      element('#education .show-item-button').click();
      expect(element('#education .item-tag').count()).toBe(2);
      expect(element('#education .item-tag').html()).toContain('edu tag');
      element('#education .item-tag .btn').click();
      expect(element('#education .item-tag').count()).toBe(0);
    });

    it('should delete an item if delete is clicked', function(){
      element('#education .delete-item-button').click();
      expect(element('#education .edit-status').html()).toContain('Succesfully deleted item');
      expect(element('#education .resource-list > div').count()).toBe(0);
    });

    it('should create an item when clicking create', function(){
      input('adminService.education.item.institution').enter('edu institution');
      input('adminService.education.item.degree').enter('edu degree');
      input('adminService.education.item.description').enter('edu description');
      input('education.tag').enter('edu tag1');
      element('#education .tag-button').click();
      input('education.tag').enter('edu tag2');
      element('#education .tag-button').click();

      element('#education .create-button').click();
      expect(element('#education .edit-status').html()).toContain('Succesfully created a new education');

      element('#education .show-item-button').click();

      expect(element('#education .item-institution').html()).toContain('edu institution');
      expect(element('#education .item-degree').html()).toContain('edu degree');
      expect(element('#education .item-description').html()).toContain('edu description');
      expect(element('#education .item-tag').html()).toContain('edu tag1');
      expect(element('#education .item-tag').count()).toBe(2);
    });

    it('should have elements in resource list', function(){
      expect(element('#education .resource-list > div').count()).toBeGreaterThan(0);
    });

    it('Should display the element when clicking show', function(){
      element('#education .show-item-button').click();
      expect(element('#education .item-institution').html()).toContain('edu institution');
      expect(element('#education .item-degree').html()).toContain('edu degree');
      expect(element('#education .item-description').html()).toContain('edu description');
      expect(element('#education .item-tag').count()).toBe(2);
      expect(element('#education .item-tag').html()).toContain('edu tag1');
    });

    it('should edit the item when pressing save', function(){
      element('#education .show-item-button').click();
      element('#education .item-tag .btn').click();
      input('adminService.education.item.institution').enter('institution2');
      input('adminService.education.item.degree').enter('edu degree2');
      input('adminService.education.item.description').enter('desc2');
      input('education.tag').enter('edu tag3');
      element('#education .tag-button').click();
      input('education.tag').enter('edu tag4');
      element('#education .tag-button').click();

      element('#education .edit-button').click();
      expect(element('#education .edit-status').html()).toContain('Succesfully edited education');

      expect(element('#education .item-institution').html()).toContain('institution2');
      expect(element('#education .item-degree').html()).toContain('edu degree2');
      expect(element('#education .item-description').html()).toContain('desc2');
      expect(element('#education .item-tag').count()).toBe(2);
      expect(element('#education .item-tag').html()).toContain('edu tag3');
    });

  });
});
