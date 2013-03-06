describe('Testing admin page', function() {

  //Tests generall behaviour and initial state of the admin page


  beforeEach(function() {
    browser().navigateTo('/#/login');
    input('user.username').enter('admin');
    input('user.password').enter('1234');

    element('#login-button').click();
    expect(element('#status').text()).toContain('Succesful login');
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
    });

    it('should all have create mode', function(){
      expect(element('#bucketlist .mode-field').html()).toContain('CREATE MODE');
      expect(element('#education .mode-field').html()).toContain('CREATE MODE');
      expect(element('#experience .mode-field').html()).toContain('CREATE MODE');
      expect(element('#me .mode-field').html()).toContain('CREATE MODE');
      expect(element('#user .mode-field').html()).toContain('CREATE MODE');

    });

    it('should have a list of resources with text, edit and show buttons', function(){
      expect(repeater('#bucketlist .resource-list').count()).toBeGreaterThan(0);
      expect(repeater('#education .resource-list').count()).toBeGreaterThan(0);
      expect(repeater('#experience .resource-list').count()).toBeGreaterThan(0);
      expect(repeater('#me .resource-list').count()).toBeGreaterThan(0);
      expect(repeater('#user .resource-list').count()).toBeGreaterThan(0);
    });
  });
});
