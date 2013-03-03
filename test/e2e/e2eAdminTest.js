describe('Testing admin page', function() {
  // var scope,
  //     browser,
  //     location;

  // beforeEach(angular.mock.module('CVApp'));

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
    localStorage.setItem('loggedIn', true);
    browser().navigateTo('/#/admin');
  });

  describe('Initial state', function(){

    it('should have all resources', function(){
      expect(repeater('.resource-title').count()).toBe(5);
      expect(repeater('.pre-json').count()).toBe(5);
      expect(repeater('.create-button').count()).toBe(5);
      expect(repeater('.clear-button').count()).toBe(5);
      expect(repeater('.edit-button').count()).toBe(5);
      expect(repeater('.mode-field').count()).toBe(5);
      expect(repeater('.tag-button').count()).toBe(3);
      expect(repeater('.pre-tag').count()).toBe(3);

    });

    it('should have deactivated save and clear buttons', function(){
      expect(element('.create-button').prop('disabled')).toBeFalsy();
      expect(element('.clear-button').prop('disabled')).toBeTruthy();
      expect(element('.edit-button').prop('disabled')).toBeTruthy();
    });

    it('should all have create mode', function(){
      expect(element('.mode-field').html()).toContain('CREATE MODE');
    });

    it('should have a list of resources with text, edit and show buttons', function(){
      expect(repeater('.resource-list').count()).toBeGreaterThan(0);
      // expect(element('.resource-list *')).
    });

    it('should have a pre field with displaying: "Current item: {}" ', function(){
      expect(element('#bucketlist-pre').html()).toContain('Current item: {}');
      expect(element('#education-pre').html()).toContain('Current item: {');
      expect(element('#education-pre').html()).toContain('"tags": []');
      expect(element('#experience-pre').html()).toContain('Current item: {');
      expect(element('#experience-pre').html()).toContain('"tags": []');
      expect(element('#me-pre').html()).toContain('Current item: {');
      expect(element('#me-pre').html()).toContain('"tags": []');
      expect(element('#user-pre').html()).toContain('Current item: {}');
    });

    it('should have a pre field displaying "tags": []', function(){
      expect(element('.pre-tag').html()).toContain('"tags": []');
    });
  });

  describe('Button behaviour', function(){

  });

  describe('Testing bucketlist admin', function(){
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
      pause()
      element('#bucketlist .edit-button').click();

      expect(element('#bucketlist-pre').html()).toContain('"title": "title2"');
      expect(element('#bucketlist-pre').html()).toContain('"description": "desc2"');
      expect(element('#bucketlist-pre').html()).toContain('"rating": 2');
    });

    it('should delete an item if delete is clicked', function(){
      element('#bucketlist .delete-item-button').click();
      expect(element('#bucketlist .resource-list > div').count()).toBe(0);
    });

    it('should create an item when clicking create', function(){
      input('adminService.bucketlist.item.title').enter('bucket title');
      input('adminService.bucketlist.item.description').enter('bucket description');
      select('adminService.bucketlist.item.rating').option('1');

      element('#bucketlist .edit-button').click();

      expect(element('#bucketlist-pre').html()).toContain('"title": "bucket title"');
      expect(element('#bucketlist-pre').html()).toContain('"description": "bucket description"');
      expect(element('#bucketlist-pre').html()).toContain('1');
    });

  });

});
