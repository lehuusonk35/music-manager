'use strict';

/**
 * @ngdoc overview
 * @name myngappAppApp
 * @description
 * # myngappAppApp
 *
 * Main module of the application.
 */
angular
  .module('myngappAppApp', [
    'ngRoute',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/playlist', {
        templateUrl: 'views/playlist.html',
        controller: 'PlayListCtrl',
        controllerAs: 'vm'
      })
      .when('/song', {
        template: '<song-list></song-list>'
      })

      .otherwise({
        redirectTo: '/song'
      });
  });
