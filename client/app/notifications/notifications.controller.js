'use strict';

angular.module('spcApp')
  .controller('NotificationsCtrl', function ($scope, notificationService, $stateParams) {

  	$scope.notifications = [];

  	notificationService.getDeviceNotifications($stateParams.deviceId, function(data) {
  		$scope.notifications = data;
  	});   

  });
