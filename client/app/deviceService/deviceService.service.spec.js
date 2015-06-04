'use strict';

describe('Service: deviceService', function () {

  // load the service's module
  beforeEach(module('spcApp'));

  // instantiate service
  var deviceService;
  beforeEach(inject(function (_deviceService_) {
    deviceService = _deviceService_;
  }));

  it('should do something', function () {
    expect(!!deviceService).toBe(true);
  });

});
