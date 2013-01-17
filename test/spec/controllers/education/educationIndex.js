'use strict';

describe('Controller: EducationIndexCtrl', function() {

  // load the controller's module
  beforeEach(module('ANGULARCVApp'));

  var EducationIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    EducationIndexCtrl = $controller('EducationIndexCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
