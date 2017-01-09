'use strict';

/**
 * @ngdoc function
 * @name posteurApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the posteurApp
 */
angular.module('posteurApp')
  .controller('MainCtrl', function ($scope, $http, $log) {
    $scope.pages = [
      {category: 'high-tech', name: 'social'},
      {category: 'high-tech', name: 'wordpress'},
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
    angular.isUndefinedOrNull = function (val) {
      return angular.isUndefined(val) || val === null;
    };
    $scope.printSelectedPages = function printSelectedPages() {
      var numberOfPages = this.selectedPages.length;
      if (numberOfPages > 1) {
        var needsOxfordComma = numberOfPages > 2;
        var lastPageConjunction = (needsOxfordComma ? ',' : '') + ' and ';
        var lastPage = lastPageConjunction +
          this.selectedPages[this.selectedPages.length - 1];
        return this.selectedPages.slice(0, -1).join(', ') + lastPage;
      }

      return this.selectedPages.join('');
    };

    var doPost = function (subDomain, token, blogData) {
      $http({
        method: 'POST',
        url: 'http://' + subDomain + '.talkoverflow.com/wp-json/wp/v2/posts',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        data: blogData
      }).then(function successCallback(response) {
        $log.info("OK");
        $scope.postCreated = true;
        $log.info(response);
      }, function errorCallback(response) {
        $log.info("ohohoh");
        $scope.postCreated = false;
        $log.info(response);
      });

    };

    $scope.postData = function () {
      if (angular.isUndefinedOrNull($scope.blogpostdate)) {
        $scope.blogpostdate = new Date();
        $scope.blogpostdate.setMinutes($scope.blogpostdate.getMinutes() + 1);
      }
      $http.get('tokens.json').then(function (data) {
        $scope.tokens = data.data.tokens;
        for (var i = 0; i < $scope.tokens.length; i++) {
          for (var t = 0; t < $scope.selectedPages.length; t++) {
            if (angular.equals($scope.tokens[i].page, $scope.selectedPages[t])) {
              $log.info($scope.selectedPages[t] + "," + $scope.tokens[i].token);
              var dataTopost = {
                title: $scope.title,
                content: $scope.body,
                date: $scope.blogpostdate,
                status: "publish"
              };
              var blogDataJson = JSON.stringify(dataTopost);
              doPost($scope.selectedPages[t], $scope.tokens[i].token, blogDataJson);
            } else {
              $scope.postCreated = false;
            }
          }
        }
      });
    };

    $scope.checkPostResponse = function () {
      return $scope.postCreated;
    };

    $scope.showSelection = function (balise) {
      var textComponent = document.getElementById('Field4');

      var selectedText;
      // IE version
      if (document.selection !== undefined) {
        textComponent.focus();
        var sel = document.selection.createRange();
        selectedText = sel.text;
        if (selectedText) {
          $scope.body = textComponent.value.replace(selectedText, '<' + balise + '>' + selectedText + '</' + balise + '>');
        }
      }
      // Mozilla version
      else if (textComponent.selectionStart !== undefined) {
        var startPos = textComponent.selectionStart;
        var endPos = textComponent.selectionEnd;
        selectedText = textComponent.value.substring(startPos, endPos);
        if (selectedText) {
          $scope.body = textComponent.value.replace(selectedText, '<' +balise + '>' + selectedText + '</' + balise + '>');
        }
      }
        if($scope.imgUrl){
          $scope.body=$scope.body.replace(':image','<img src="'+$scope.imgUrl+'"'+ 'alt="Post Image" >');
        }else{
          $scope.body=$scope.body.replace(':image','');
        }
    };
  });


