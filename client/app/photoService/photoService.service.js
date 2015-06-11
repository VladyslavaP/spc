'use strict';

angular.module('spcApp')
  .service('photoService', function ($http) {
  	this.getPhotos = function(callback) {
	  	$http
		    .get('/api/users/photos/all')
		    .success(function(data) {
		    	console.log(data);
		    	if(!callback) { return; }
		      	callback(data);
		});
	};

  	this.removePhoto = function(url, callback) {
	  	$http
		    .get('/api/users/photos/remove/'+ encodeURIComponent(url))
		    .success(function(data) {
		    	console.log(data);
		    	if(!callback) { return; }
		      	callback(data);
		});
	};	

  this.addPhoto = function(url, callback) {
	  	$http
		    .get('/api/users/photos/add')
		    .success(function(data) {
		    	console.log(data);
		    	if(!callback) { return; }
		      	callback(data);
		});
	};	

  });
