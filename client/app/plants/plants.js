'use strict';

angular.module('spcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plants', {
        url: '/plants',
        templateUrl: 'app/plants/plants.html',
        controller: 'PlantsCtrl'
      });
  });