'use strict';

angular.module('spcApp')
  .service('notificationService', function () {

  	this.getDeviceNotifications = function(deviceId, callback) {
  		$http
	        .get('/api/notifications/unread/'+deviceId)
	        .success(function(data) {
	          callback(data);
	        });
  	};

  });
