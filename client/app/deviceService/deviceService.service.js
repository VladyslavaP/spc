'use strict';

angular.module('spcApp')
  .service('deviceService', function ($http) {
  	this.create = function(device, callback) {
  		$http
  			.post('/api/devices', device)
  			.success(function(data) {
          if(!callback) { return; }
  				callback(data);
  			});
  	};

  	this.get = function(callback) {
  		$http
  			.get('/api/devices/user')
  			.success(function(data) {
          if(!callback) { return; }
  				callback(data);
  			});  		
  	};

    this.getById = function(deviceId, callback) {
      $http
        .get('/api/devices/id/'+deviceId)
        .success(function(data) {
          if(!callback) { return; }
          callback(data);
        });
    };

    this.update = function(device, callback) {
      $http
        .post('/api/devices/update/', device)
        .success(function(data) {
          if(!callback) { return; }
          callback(data);
        });
    }; 

    this.delete = function(deviceId, callback) {
      $http
        .delete('/api/devices/id/'+deviceId)
        .success(function(data) {
          if(!callback) { return; }
          callback(data);
        });
    };

  });