'use strict';

angular.module('spcApp')
  .controller('GalleryCtrl', function ($scope, photoService) {

  	$scope.photosUrl = [];

  	photoService.getPhotos(function(data) {
  		$scope.photosUrl = data;
  	});

  	$scope.delete = function(i) {
  		photoService.removePhoto($scope.photosUrl[i], function() {
  			$scope.photosUrl.splice(i, 1);
  		});
  	};

  });
