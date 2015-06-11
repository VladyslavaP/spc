'use strict';

angular.module('spcApp')
  .service('photoService', function ($http) {
  	this.getPhotos = function(callback) {
	  	$http
		    .get('/api/users/all')
		    .success(function(data) {
		    	console.log(data);
		    	if(!callback) { return; }
		      	callback(data);
		});
	};

  	this.deletePhoto = function(url, callback) {
	  	$http
		    .get('/api/users/remove/'+url)
		    .success(function(data) {
		    	console.log(data);
		    	if(!callback) { return; }
		      	callback(data);
		});
	};	

  	this.addPhoto = function(url, callback) {
	  	$http
		    .get('/api/users/add/'+url)
		    .success(function(data) {
		    	console.log(data);
		    	if(!callback) { return; }
		      	callback(data);
		});
	}	

  });
