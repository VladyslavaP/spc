'use strict';

angular.module('spcApp')
  .controller('NotificationsCtrl', function ($scope, notificationService, $stateParams, _) {

  	$scope.notifications = [];

  	notificationService.getDeviceNotifications($stateParams.deviceId, function(data) {
  		$scope.notifications = data;

		var petIsNear = "Your pet is near the device";

  		var petClose = _.where(data, function(n) { return n.message === petIsNear; });
  		console.log(petClose);
		if (petClose.length > 0) {
			var timeRange =  new Date();
			timeRange.setMinutes(timeRange.getMinutes() - 20);  
			var time = _.chain(petClose)
				.sortBy(function(n) { return n.time })
				.find(function(n) { return (new Date(n.time) > timeRange) && (new Date(n.time) < new Date()) })
				.value();
			if (time) {
				time = time.time;
				$scope.stillThere  = new Date(time) > timeRange;
			}
		}
  	});   


  	$scope.markViewed = function(notification) {
        if (notification.viewed) { return; }
        notificationService.markViewed(notification._id, function() {
            notification.viewed = true;
        });
    };

  });
