'use strict';

angular.module('spcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plants', {
        url: '/plants/{deviceId}',
        templateUrl: 'app/plants/plants.html',
        controller: 'PlantsCtrl'
      });
  });