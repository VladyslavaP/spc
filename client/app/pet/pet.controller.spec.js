'use strict';

describe('Controller: PetCtrl', function () {

  // load the controller's module
  beforeEach(module('spcApp'));

  var PetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PetCtrl = $controller('PetCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
