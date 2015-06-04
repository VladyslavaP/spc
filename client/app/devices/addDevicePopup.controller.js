'use strict';

angular.module('spcApp')
  .controller('DevicePopupCtrl', function ($scope, $modalInstance) {

  	$scope.newDevice = {
      type: 'pets'
    };

  	$scope.create = function() {
  		if ($scope.newDevice.name !== undefined) {
  			$modalInstance.close($scope.newDevice);
  		}
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
 	  };
  });