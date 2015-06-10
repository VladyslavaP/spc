'use strict';

angular.module('spcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stats', {
        url: '/stats',
        templateUrl: 'app/stats/stats.html',
        controller: 'StatsCtrl'
      });
  });