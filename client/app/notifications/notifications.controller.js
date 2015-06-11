'use strict';

angular.module('spcApp')
  .controller('NotificationsCtrl', function ($scope, notificationService, $stateParams, _, photoService) {

  	$scope.notifications = [];

    var stillThere = function(data) {
      var petIsNear = 'Your pet is near the device';
      var petClose = _.where(data, function(n) { return n.message === petIsNear; });
 
      if (petClose.length > 0) {
        var timeRange =  new Date();
        timeRange.setMinutes(timeRange.getMinutes() - 20);  
        var time = _.chain(petClose)
          .sortBy(function(n) { return n.time; })
          .find(function(n) { return (new Date(n.time) > timeRange) && (new Date(n.time) < new Date()); })
          .value();
        if (time) {
          time = time.time;
          $scope.stillThere  = new Date(time) > timeRange;
        }
      }
    };

    if($stateParams.deviceId){
      notificationService.getDeviceNotifications($stateParams.deviceId, function(data) {
        $scope.notifications = data;
        stillThere(data);
      }); 
    } else {
      notificationService.getAll( function(data) {
        console.log(data);
        $scope.notifications = data;
        stillThere(data);
      });
    }

    $scope.addPhoto = function() {
      $scope.photoAdded = true;
      photoService.addPhoto();
    };

  	$scope.markViewed = function(notification) {
        if (notification.viewed) { return; }
        notificationService.markViewed(notification._id, function() {
            notification.viewed = true;
        });
    };

  });
