'use strict';

angular.module('spcApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.interval = 5000;

    $scope.slides = [
      {
        image: 'assets/images/slide1.png'
      },
      {
        image: 'assets/images/slide2.png'
      },
      {
        image: 'assets/images/slide3.png'
      },      
      {
        image: 'assets/images/slide4.png'
      }
    ];
  });
