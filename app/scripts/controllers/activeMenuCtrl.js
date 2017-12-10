'use strict';

/**
 * @ngdoc function
 * @name myngappAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myngappAppApp
 */
angular.module('myngappAppApp')
  .controller('activeMenuCtrl', function ($scope) {
    $scope.menuItems = [
      {
        nameurl: 'Song',
        geturl: '#!/song'
      },
      {
        nameurl: 'Play List',
        geturl: '#!/playlist'
      }];

    $scope.activeMenu = $scope.menuItems[0].nameurl;

    $scope.setActive = function(menuItem) {
      $scope.activeMenu = menuItem
    }

  });
