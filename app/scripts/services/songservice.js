'use strict';

/**
 * @ngdoc service
 * @name myngappAppApp.myService
 * @description
 * # myService
 * Service in the myngappAppApp.
 */
angular.module('myngappAppApp')
  .service('SongService', function () {
    var oid = 4;
    var songs = [
      {
        id: 0,
        name: 'Radioactive',
        artist: 'Imagine Dragon'
      },
      {
        id: 1,
        name: '	Rolling in the deep',
        artist: '	Adele'
      },
      {
        id: 2,
        name: 'Uninstall',
        artist: 'Chiaki Isikawa'
      },
      {
        id: 3,
        name: '	Viva la vida',
        artist: 'Coldplay'
      }
    ];
    this.save = function (song) {
      if (song.id == null ) {
        song.id = oid++;
        songs.push(song);
      } else {
        for (var i = 0; i < songs.length; i++) {
          if (songs[i].id == song.id ) {
            songs[i] = song;
          }
        }
      }

    }
    this.get = function (id) {
      for (var i = 0; i < songs.length; i++) {
        if (songs[i].id == id) {
          return songs[i];
        }
      }

    }
    this.delete = function (id) {
      for (var i = 0; i < songs.length; i++) {
        if (songs[i].id == id) {
          songs.splice(i, 1);
        }
      }
    }
    this.list = function () {
      return songs;
    }
  });