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
        artist: 'Imagine Dragon',
        isSelected:false
      },
      {
        id: 1,
        name: '	Rolling in the deep',
        artist: '	Adele',
        isSelected:false
      },
      {
        id: 2,
        name: 'Uninstall',
        artist: 'Chiaki Isikawa',
        isSelected:false
      },
      {
        id: 3,
        name: '	Viva la vida',
        artist: 'Coldplay',
        isSelected:false
      }
    ];
    this.isSelectedAll =  {
      check: false
    };
    this.save = function (song) {
      if( song.name !== '' && song.artist !== '' ){
        if ( song.id !== null  || song.id !== '') {
          song.id = oid++;
          songs.push(song);
        }
        else {
          for (var i = 0; i < songs.length; i++) {
            if (songs[i].id === song.id ) {
              songs[i] = song;
            }
          }
        }
      }

    };
    this.get = function (id) {
      for (var i = 0; i < songs.length; i++) {
        if (songs[i].id === id) {
          return songs[i];
        }
      }

    };
    this.delete = function (id) {
      for (var i = 0; i < songs.length; i++) {
        if (songs[i].id === id) {
          songs.splice(i, 1);
          break;
        }
      }
    };
    this.list = function () {
      return songs;
    };

    this.action = {
      view : {
        id : 'main',
        url : 'scripts/song/mainsong/mainsong.html'

      },
      create : {
        id : 'create',
        url : 'scripts/song/add/add.template.html'

      },
      edit : {
        id : 'edit',
        url : 'scripts/song/add/add.template.html'
      }
    };

    this.cache = {
      currAction : this.action.view,
      songModel : {
        id : '',
        name : '',
        artist : '',
        selected : false
      },
      reset : function () {
        this.songModel.id = '';
        this.songModel.name = '';
        this.songModel.artist = '';
        this.songModel.selected = false;
      }
    };
  });
