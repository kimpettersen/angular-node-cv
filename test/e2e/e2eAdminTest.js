describe('Testing routes', function() {
  // var scope,
  //     browser,
  //     location;

  // beforeEach(angular.mock.module('CVApp'));


  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });
  // beforeEach(angular.mock.module('controllers'));

  // beforeEach( inject(function($rootScope, $controller, $location, $browser) {
  //      scope = $rootScope.$new();
  //      ctrl = $controller('MenuCtrl', {
  //        $scope: scope,
  //        $location: $location
  //      });
  //      browser = $browser;
  //      location = $location;
  //   }));

  describe('Initial state', function(){
    it('should have bucketlist form', function(){
      console.log('In here');
      // expect(browser().location().path)
    });
  });
});
