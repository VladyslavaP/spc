'use strict';

describe('Controller: NotificationsCtrl', function () {

  // load the controller's module
  beforeEach(module('spcApp'));

  var NotificationsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotificationsCtrl = $controller('NotificationsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
