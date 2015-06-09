'use strict';

angular.module('spcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fishes', {
        url: '/fishes/{deviceId}',
        templateUrl: 'app/fishes/fishes.html',
        controller: 'FishesCtrl'
      });
  });