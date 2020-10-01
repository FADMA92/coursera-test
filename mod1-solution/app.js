(function () {
  'use strict';

angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
    function LunchCheckController ($scope){
      $scope.message="Check your healthiness";

      $scope.numberElements = function () {
        if ($scope.lunch) {
          var elementString = $scope.lunch
          var lunchArray = elementString.split(",").length
          return lunchArray;
        }
        else {
          return (' ');
        }
      }

      $scope.Check = function () {
        var totalElements = $scope.numberElements();

        if (totalElements === ' ') {
          $scope.message = "Please enter data first"
        }

        else if (totalElements <= 3){
          $scope.message = "Enjoy!"
        }
        else {
          $scope.message = "Too much!"
        }
      };

    }
  } )()
