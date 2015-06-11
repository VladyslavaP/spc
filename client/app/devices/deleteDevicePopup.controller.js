'use strict';

angular.module('spcApp')
  .controller('DeletePopupCtrl', function ($scope, $modalInstance) {


  	$scope.delete = function() {
      $modalInstance.close(true);
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
 	  };
  });