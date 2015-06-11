'use strict';

angular.module('spcApp')
  .controller('DevicesCtrl', function ($scope, $modal, deviceService, $state) {

    $scope.devices = [];

    deviceService.get(function(data) {
        $scope.devices = data;
    });

    $scope.goToConfig = function(device) {
        $state.go(device.type, {deviceId: device._id});
    };

    $scope.goToAllNotifications = function() {
        $state.go('notifications');
    };

    $scope.goToNotifications = function(device) {
        $state.go('notifications', {deviceId: device._id});
    };

    $scope.goToStats = function(device) {
        $state.go('stats', {deviceId: device._id});
    };

    $scope.delete = function(i) {
        var device = $scope.devices[i];

        var modalInstance = $modal.open({
            animation: true,
            template:   [
                        '<div id="popup">',
                        '   <div>',
                        '       <h3 id="add-device-header">Delete?</h3>',
                        '   </div>',
                        '   <div id="add-device-footer">',
                        '       <button ng-click="delete()">OK</button>',
                        '       <button ng-click="cancel()">Cancel</button>',
                        '   </div>',
                        '</div>'
                        ].join(''),

            controller: 'DeletePopupCtrl',
            size: 'sm',
        });
        modalInstance.result.then(function (confirmed) {
            if (!confirmed) return;
            deviceService.delete(device._id, function() {
                $scope.devices.splice(i, 1);
            });
        });
    };

    $scope.addDevice = function() {
        var modalInstance = $modal.open({
            animation: true,
         /*   templateUrl: 'add-device-popup.html',*/
            template:   [
            			'<div id="popup">',
			            '	<div>',
			            '		<h3 id="add-device-header">Add new device</h3>',
			            '	</div>',
			            '	<div id="add-device-body">',
			            '		<p>Device name: </p>',
			            '		<input placeholder="Device name" ng-model="newDevice.name"/>',
                        '       <br/>',
                        '       <p>Device for: </p>',
                        '       <select ng-model="newDevice.type">',
                        '           <option value="pets" selected>Pets</option>',
                        '           <option value="fishes">Fishes</option>',
                        '           <option value="plants">Plants</option>',
                        '       </select>',
			            '	</div>',
			            '	<div id="add-device-footer">',
			            '		<button ng-click="create()">OK</button>',
			            '		<button ng-click="cancel()">Cancel</button>',
			            '	</div>',
			            '</div>'
			            ].join(''),

            controller: 'DevicePopupCtrl',
            size: 'sm',
        });
        modalInstance.result.then(function (newDevice) {
            deviceService.create(newDevice, function(created) {
                $scope.devices.push(created);
            });           
        }, function () {
            console.log('add dev fail');
        });
    };

  });
