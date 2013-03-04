describe('Admin page bucketlist items', function(){

  beforeEach(function() {
    browser().navigateTo('/#/login');
    input('user.username').enter('admin');
    input('user.password').enter('1234');

    element('#login-button').click();
    expect(element('#status').text()).toContain('Succesful login');
    browser().navigateTo('/#/admin');
    expect(element('#bucketlist .edit-status').html()).toBe('');
  });

  describe('Button behaviour', function(){
    it('should have create enabled and edit/clear disabled as default', function(){
      expect(element('#bucketlist .create-button').prop('disabled')).toBeFalsy();
      expect(element('#bucketlist .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#bucketlist .edit-button').prop('disabled')).toBeTruthy();
      expect(element('#bucketlist .mode-field').html()).toContain('CREATE MODE');
    });

    it('should have edit/clear enabled and create disabled when editing', function(){
      element('#bucketlist .show-item-button').click();
      expect(element('#bucketlist .mode-field').html()).toContain('EDIT MODE');

      expect(element('#bucketlist .create-button').prop('disabled')).toBeTruthy();
      expect(element('#bucketlist .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#bucketlist .edit-button').prop('disabled')).toBeFalsy();
    });

    it('should remove current item when pressing clear', function(){
      element('#bucketlist .show-item-button').click();
      expect(element('#bucketlist .mode-field').html()).toContain('EDIT MODE');

      expect(element('#bucketlist .create-button').prop('disabled')).toBeTruthy();
      expect(element('#bucketlist .clear-button').prop('disabled')).toBeFalsy();
      expect(element('#bucketlist .edit-button').prop('disabled')).toBeFalsy();

      element('#bucketlist .clear-button').click();

      expect(element('#bucketlist .mode-field').html()).toContain('CREATE MODE');

      expect(element('#bucketlist .create-button').prop('disabled')).toBeFalsy();
      expect(element('#bucketlist .clear-button').prop('disabled')).toBeTruthy();
      expect(element('#bucketlist .edit-button').prop('disabled')).toBeTruthy();

    });
  });

  describe('Testing bucketlist admin', function(){
    it('should delete an item if delete is clicked', function(){
      element('#bucketlist .delete-item-button').click();
      expect(element('#bucketlist .edit-status').html()).toContain('Succesfully deleted item');
      expect(element('#bucketlist .resource-list > div').count()).toBe(0);
    });

    it('should create an item when clicking create', function(){
      input('adminService.bucketlist.item.title').enter('bucket title');
      input('adminService.bucketlist.item.description').enter('bucket description');
      select('adminService.bucketlist.item.rating').option('0');

      element('#bucketlist .create-button').click();

      expect(element('#bucketlist .edit-status').html()).toContain('Succesfully created a new bucketlist');

      element('#bucketlist .show-item-button').click();

      expect(element('#bucketlist-pre').html()).toContain('"title": "bucket title"');
      expect(element('#bucketlist-pre').html()).toContain('"description": "bucket description"');
      expect(element('#bucketlist-pre').html()).toContain('1');
    });

    it('should have elements in resource list', function(){
      expect(element('#bucketlist .resource-list > div').count()).toBeGreaterThan(0);
    });


    it('Should display the element when clicking show', function(){
      element('#bucketlist .show-item-button').click();
      expect(element('#bucketlist-pre').html()).toContain('"title": "bucket title"');
      expect(element('#bucketlist-pre').html()).toContain('"description": "bucket description"');
      expect(element('#bucketlist-pre').html()).toContain('1');
    });

    it('should edit the item when pressing save', function(){
      element('#bucketlist .show-item-button').click();
      input('adminService.bucketlist.item.title').enter('title2');
      input('adminService.bucketlist.item.description').enter('desc2');
      select('adminService.bucketlist.item.rating').option('2');
      element('#bucketlist .edit-button').click();
      expect(element('#bucketlist .edit-status').html()).toContain('Succesfully edited bucketlist');

      expect(element('#bucketlist-pre').html()).toContain('"title": "title2"');
      expect(element('#bucketlist-pre').html()).toContain('"description": "desc2"');
      expect(element('#bucketlist-pre').html()).toContain('"rating": 3');
    });

  });
});
