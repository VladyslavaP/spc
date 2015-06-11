'use strict';

angular.module('spcApp')
  .controller('StatsCtrl', function ($scope, statService, $stateParams) {

  		var DAY = 1;
  		var WEEK = 7;
  		var MONTH = 30;

	  	statService.getStats($stateParams.deviceId, DAY, function(data) {
	  		$scope.dayStats = data;
	  	});
	  	statService.getStats($stateParams.deviceId, WEEK, function(data) {
	  		$scope.weekStats = data;
	  	});
	  	statService.getStats($stateParams.deviceId, MONTH, function(data) {
	  		$scope.monthStats = data;
	  	});	  	

  });
