describe('Testing routes', function() {
    var scope;


var $injector = angular.injector(['CVApp', 'ng']),
  $controller = $injector.get('$controller');

console.log($controller);

    beforeEach(angular.mock.module('CVApp'));
    // beforeEach(module('controllers'));

  beforeEach( inject(function($rootScope) {
       scope = $rootScope.$new();

       ctrl = $controller('MenuCtrl', {
         $scope: scope
       });
       // $browser = $browser;
    }));


  it('Should change the location path of the browser to what\'s passed', function(){
      ctrl.changeView('/#/admin');
      expect(browser().location().path()).toBe('/#/admin');
  });

//    it('should set the default category to match the category_id
// found in location.hash', function() {
//        $location.updateHash('#/categories/2');
//        $browser.poll();
//        expect(ctrl.selectedCategory).toEqual('2');
//      });

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
