'use strict';

angular.module('spcApp')
  .service('deviceService', function ($http) {
  	this.create = function(device, callback) {
  		$http
  			.post('/api/devices', device)
  			.success(function(data) {
  				callback(data);
  			});
  	};

  	this.get = function(callback) {
  		$http
  			.get('/api/devices/user')
  			.success(function(data) {
  				callback(data);
  			});  		
  	};

  });