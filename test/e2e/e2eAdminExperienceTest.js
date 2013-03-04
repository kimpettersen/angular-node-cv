describe('Admin page experience items', function(){

  beforeEach(function() {
    browser().navigateTo('/#/login');
    input('user.username').enter('admin');
    input('user.password').enter('1234');

    element('#login-button').click();
    expect(element('#status').text()).toContain('Succesful login');
    browser().navigateTo('/#/admin');
    expect(element('#experience .edit-status').html()).toBe('');
  });

  describe('Button behaviour', function(){
    it('should have create enabled and edit/clear disabled as default', function(){
      expect(element('#experience .create-button').prop('disabled')).toBeFalsy();
      expect(element('#experience .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#experience .edit-button').prop('disabled')).toBeTruthy();
      expect(element('#experience .mode-field').html()).toContain('CREATE MODE');
    });

    it('should have edit/clear enabled and create disabled when editing', function(){
      element('#experience .show-item-button').click();
      expect(element('#experience .mode-field').html()).toContain('EDIT MODE');

      expect(element('#experience .create-button').prop('disabled')).toBeTruthy();
      expect(element('#experience .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#experience .edit-button').prop('disabled')).toBeFalsy();
    });

    it('should remove current item when pressing clear', function(){
      element('#experience .show-item-button').click();
      expect(element('#experience .mode-field').html()).toContain('EDIT MODE');

      expect(element('#experience .create-button').prop('disabled')).toBeTruthy();
      expect(element('#experience .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#experience .edit-button').prop('disabled')).toBeFalsy();

      element('#experience .clear-button').click();

      expect(element('#experience .mode-field').html()).toContain('CREATE MODE');

      expect(element('#experience .create-button').prop('disabled')).toBeFalsy();
      expect(element('#experience .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#experience .edit-button').prop('disabled')).toBeTruthy();

    });
  });

  describe('Testing experience admin', function(){

    it('should delete an item if delete is clicked', function(){
      element('#experience .delete-item-button').click();
      expect(element('#experience .edit-status').html()).toContain('Succesfully deleted item');
      expect(element('#experience .resource-list > div').count()).toBe(0);
    });

    it('should create an item when clicking create', function(){
      input('adminService.experience.item.company').enter('edu company');
      input('adminService.experience.item.duration').enter('edu duration');
      input('adminService.experience.item.description').enter('edu description');
      input('experience.tag').enter('edu tag1');
      element('#experience .tag-button').click();
      input('experience.tag').enter('edu tag2');
      element('#experience .tag-button').click();

      element('#experience .create-button').click();
      expect(element('#experience .edit-status').html()).toContain('Succesfully created a new experience');

      element('#experience .show-item-button').click();

      expect(element('#experience-pre').html()).toContain('"company": "edu company"');
      expect(element('#experience-pre').html()).toContain('"duration": "edu duration"');
      expect(element('#experience-pre').html()).toContain('"description": "edu description"');
      expect(element('#experience-pre').html()).toContain('edu tag1');
      expect(element('#experience-pre').html()).toContain('edu tag2');
    });

    it('should have elements in resource list', function(){
      expect(element('#experience .resource-list > div').count()).toBeGreaterThan(0);
    });

    it('Should display the element when clicking show', function(){
      element('#experience .show-item-button').click();
      expect(element('#experience-pre').html()).toContain('"company": "edu company"');
      expect(element('#experience-pre').html()).toContain('"duration": "edu duration"');
      expect(element('#experience-pre').html()).toContain('"description": "edu description"');
      expect(element('#experience-pre').html()).toContain('edu tag1');
      expect(element('#experience-pre').html()).toContain('edu tag2');
    });

    it('should edit the item when pressing save', function(){
      element('#experience .show-item-button').click();
      input('adminService.experience.item.company').enter('company2');
      input('adminService.experience.item.duration').enter('edu duration2');
      input('adminService.experience.item.description').enter('desc2');
      input('experience.tag').enter('edu tag3');
      element('#experience .tag-button').click();
      input('experience.tag').enter('edu tag4');
      element('#experience .tag-button').click();

      element('#experience .edit-button').click();
      expect(element('#experience .edit-status').html()).toContain('Succesfully edited experience');

      expect(element('#experience-pre').html()).toContain('"company": "company2"');
      expect(element('#experience-pre').html()).toContain('"duration": "edu duration2"');
      expect(element('#experience-pre').html()).toContain('"description": "desc2"');

      expect(element('#experience-pre').html()).toContain('edu tag3');
      expect(element('#experience-pre').html()).toContain('edu tag4');
    });

  });
});
