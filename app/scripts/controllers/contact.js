'use strict';

angular.module('posteurApp').controller('mainController', function ($scope, $log) {

  // function to submit the form after all validation has occurred
  $scope.submitForm = function (isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      $log.info('our form is amazing');
    }

  };

});
