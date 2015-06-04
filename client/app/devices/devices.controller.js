'use strict';

angular.module('spcApp')
  .controller('DevicesCtrl', function ($scope, $modal) {

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
                        '       <select>',
                        '           <option value="pets">Pets</option>',
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
            console.log(newDevice);
        }, function () {
            console.log('I FAILED YOU MASTER');
        });
    };

  });
