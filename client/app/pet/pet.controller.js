'use strict';

angular.module('spcApp')
  .controller('PetCtrl', function ($scope, $stateParams, deviceService) {
  	deviceService.getById($stateParams.deviceId, function(device) {
  		$scope.device = device;

  		if($scope.device.config === undefined) {
	  		$scope.device.config = {};
  		}
  		if($scope.device.config.foodModule === undefined) {
  			$scope.device.config.foodModule = {};
  		}
  		if($scope.device.config.waterModule === undefined) {
  			$scope.device.config.waterModule = {};
  		}
  		if($scope.device.config.fridgeModule === undefined) {
  			$scope.device.config.fridgeModule = {};
  		}

  		device.config.fridgeModule.fridgeOpenTime = new Date(device.config.fridgeModule.fridgeOpenTime);
  	});

  	$(document).ready( function() {
  		$('#edit-button').click(function(){
  			$('#dev-name-input').prop('readonly', false);
  			$('#config-container input').prop('readonly', false);
  			$('#dev-name-input').css('border', '2px ridge #b6b8ba');
  			$('#config-container input').css('border', '2px ridge #b6b8ba');
  		});
  	});

  	$scope.save = function() {
  		console.log($);
  		$('#dev-name-input').prop('readonly', true);
  		$('#config-container  input').prop('readonly', true);
  		$('#dev-name-input').css('border', 'none');
  		$('#config-container input').css('border', 'none');	

    		deviceService.update($scope.device, function() {
    			console.log('success');
    		});
    };

  });
