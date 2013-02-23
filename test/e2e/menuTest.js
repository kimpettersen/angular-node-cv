describe('Testing routes', function() {


  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  it('', function(){
      expect(browser().location().path()).toBe('/#/');
  });


//    it('should set the default category to match the category_id
// found in location.hash', function() {
//        $location.updateHash('#/categories/2');
//        $browser.poll();
//        expect(ctrl.selectedCategory).toEqual('2');
//      });

});
