'use strict';

angular.module('spcApp')
  .service('notificationService', function ($http) {

  	this.getDeviceNotifications = function(deviceId, callback) {
  		$http
        .get('/api/notifications/unread/'+deviceId)
        .success(function(data) {
          if(!callback) { return; }
          callback(data);
        });
  	};


    this.markViewed = function(id, callback) {
      $http
        .get('/api/notifications/viewed/' + id)
        .success(function(data) {
          if(!callback) { return; }
          callback(data);
        });
    };

    this.getAll = function(callback) {
      $http
        .get('/api/notifications/today')
        .success(function(data) {
          if(!callback) { return; }
          callback(data);
        });
    };

  });
