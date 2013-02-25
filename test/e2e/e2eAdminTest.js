describe('Testing routes', function() {
  // var scope,
  //     browser,
  //     location;

  // beforeEach(angular.mock.module('CVApp'));

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
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
      // console.log(element(document));
      // expect(element(document).find('.pre-json')).toContain('Current item: {}');
    });

    it('should have a pre field displaying "tags": []', function(){
      expect(element('.pre-tag').html()).toContain('"tags": []');
    });

  });
});
