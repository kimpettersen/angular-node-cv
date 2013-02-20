describe('Testing routes', function() {

  beforeEach(angular.mock.module('CVApp'));

  // beforeEach(function() {
  //   browser().navigateTo('app/index.html');
  // });

  it('Should change the location path of the browser to what\'s passed', inject(function($controller){
      var ctrl = $controller('MenuCtrl');
      ctrl.changeView('/#/admin');
      expect(browser().location().path()).toBe('/#/admin');
    }));

  // it('should jump to the /videos path when / is accessed', function() {
  //   browser().navigateTo('#!/');
  //   expect(browser().location().path()).toBe("/videos");
  // });

  // it('should have a working /videos route', function() {
  //   browser().navigateTo('#!/videos');
  //   expect(browser().location().path()).toBe("/videos");
  // });

  // it('should have a working /wathced-videos route', function() {
  //   browser().navigateTo('#!/watched-videos');
  //   expect(browser().location().path()).toBe("/watched-videos");
  // });

  // it('should have a working /videos/ID route', function() {
  //   browser().navigateTo('#!/videos/10');
  //   expect(browser().location().path()).toBe("/videos/10");
  // });
});
