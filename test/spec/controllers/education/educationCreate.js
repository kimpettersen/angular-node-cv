'use strict';

describe('Controller: EducationCreateCtrl', function() {

  // load the controller's module
  beforeEach(module('ANGULARCVApp'));

  var EducationCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    EducationCreateCtrl = $controller('EducationCreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
