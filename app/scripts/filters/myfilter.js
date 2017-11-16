'use strict';

/**
 * @ngdoc filter
 * @name myngappAppApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the myngappAppApp.
 */
angular.module('myngappAppApp')
  .filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });
