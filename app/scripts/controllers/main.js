'use strict';

/**
 * @ngdoc function
 * @name posteurApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the posteurApp
 */
angular.module('posteurApp')
  .controller('MainCtrl', function ($scope,$log) {
    $scope.pages = [
      {category: 'high-tech', name: 'Apple'},
      {category: 'high-tech', name: 'Iphone'},
      {category: 'high-tech', name: '3D Printer'},
      {category: 'high-tech', name: 'Tesla'},
      {category: 'sports', name: 'ChampionsLeag'},
      {category: 'sports', name: 'WorldCup'},
      {category: 'sports', name: 'CupAfrica'},
      {category: 'sports', name: 'OlympicGames'}
    ];
    $scope.selectedPages = [];
    $scope.blogpostdate=new Date();
    $scope.printSelectedPages = function printSelectedPages() {
      var numberOfToppings = this.selectedPages.length;
      if (numberOfToppings > 1) {
        var needsOxfordComma = numberOfToppings > 2;
        var lastToppingConjunction = (needsOxfordComma ? ',' : '') + ' and ';
        var lastTopping = lastToppingConjunction +
          this.selectedPages[this.selectedPages.length - 1];
        return this.selectedPages.slice(0, -1).join(', ') + lastTopping;
      }

      return this.selectedPages.join('');
    };

    $scope.postData=function () {
      $log.info($scope.title);
      $log.info($scope.blogpostdate);
      $log.info($scope.body);
      $log.info($scope.selectedPages);
    };
  });


