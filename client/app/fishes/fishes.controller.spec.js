'use strict';

describe('Controller: FishesCtrl', function () {

  // load the controller's module
  beforeEach(module('spcApp'));

  var FishesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FishesCtrl = $controller('FishesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
