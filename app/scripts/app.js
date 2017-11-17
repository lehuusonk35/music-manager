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
    'ngRoute'

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
        templateUrl: 'views/song.html',
        controller: 'SongCtrl',
        service: 'SongService'
      })
      .otherwise({
        redirectTo: '/song'
      });
  });
