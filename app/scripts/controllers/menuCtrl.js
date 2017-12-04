'use strict';

/**
 * @ngdoc function
 * @name myngappAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myngappAppApp
 */
angular.module('myngappAppApp')
  .controller('menuCtrl', function () {
    this.navOpen = false;

    this.toggle = function () {
      this.navOpen = !this.navOpen;
    };
  });
