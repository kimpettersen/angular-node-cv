'use strict';

describe('Controller: EducationViewCtrl', function() {

  // load the controller's module
  beforeEach(module('ANGULARCVApp'));

  var EducationViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    EducationViewCtrl = $controller('EducationViewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
