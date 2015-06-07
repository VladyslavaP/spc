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

    $scope.goToNotifications = function(device) {
        $state.go('notifications', {deviceId: device._id});
    };

    $scope.delete = function(device) {
        deviceService.delete(device._id, function() {
            console.log('how to reload ?????');
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
