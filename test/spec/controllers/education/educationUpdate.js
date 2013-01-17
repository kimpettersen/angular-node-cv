'use strict';

describe('Controller: EducationUpdateCtrl', function() {

  // load the controller's module
  beforeEach(module('ANGULARCVApp'));

  var EducationUpdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    EducationUpdateCtrl = $controller('EducationUpdateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
