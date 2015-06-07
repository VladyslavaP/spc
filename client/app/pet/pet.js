'use strict';

angular.module('spcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pets', {
        url: '/pets/{deviceId}',
        templateUrl: 'app/pet/pet.html',
        controller: 'PetCtrl'
      });
  });