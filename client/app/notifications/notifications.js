'use strict';

angular.module('spcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('notifications', {
        url: '/notifications/{deviceId}',
        templateUrl: 'app/notifications/notifications.html',
        controller: 'NotificationsCtrl'
      });
  });