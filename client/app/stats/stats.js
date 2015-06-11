'use strict';

angular.module('spcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stats', {
        url: '/stats/{deviceId}',
        templateUrl: 'app/stats/stats.html',
        controller: 'StatsCtrl'
      });
  });