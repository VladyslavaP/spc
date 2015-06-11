'use strict';

angular.module('spcApp')
  .service('statService', function ($http) {
    this.getStats = function(deviceId, days, callback) {
      $http
        .get('/api/stats/days', { params: {deviceId: deviceId, days: days}})
        .success(function(data) {
        	console.log(data);
        	if(!callback) { return; }
          	callback(data);
        });
    };
  });
