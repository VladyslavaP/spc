'use strict';

describe('Controller: PlantsCtrl', function () {

  // load the controller's module
  beforeEach(module('spcApp'));

  var PlantsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlantsCtrl = $controller('PlantsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
