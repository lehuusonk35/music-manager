'use strict';

/**
 * @ngdoc service
 * @name myngappAppApp.myService
 * @description
 * # myService
 * Service in the myngappAppApp.
 */
angular.module('myngappAppApp')
  .service('playListService', function (SongService) {
    var oid = 4;
    var songs = SongService.listsong();
    var lists = [
      {
        id: 0,
        name: 'Play list 01',
        desc: 'This is play list 01',
        listOfSongs:[songs[0],songs[1]],
        isSelected:false
      },
      {
        id: 1,
        name: 'Play list 02',
        desc: 'This is play list 02',
        listOfSongs:[songs[1],songs[2]],
        isSelected:false
      },
      {
        id: 2,
        name: 'Play list 03',
        desc: 'This is play list 03',
        listOfSongs:[songs[3],songs[2]],
        isSelected:false
      },
      {
        id: 3,
        name: 'Play list 04',
        desc: 'This is play list 04',
        listOfSongs:[songs[2],songs[3]],
        isSelected:false
      }
    ];


    this.save = function (list) {
      if( list.name !== '' && list.desc !== '' ){
        if (list.id !== undefined || list.id !== null) {
          list.id = oid++;
          lists.push(list);
        }
      }

    };
    this.edit = function (list) {
      if( list.name !== '' && list.desc !== '' ){
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id === list.id) {
          lists[i] = list;
          break;
        }
      }
      }
    };
    this.get = function (id) {
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id === id) {
          return lists[i];
        }
      }

    };
    this.delete = function (id) {
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id === id) {
          lists.splice(i, 1);
          break;
        }
      }
    };

    this.list = function () {
      return lists;
    };

    this.action = {
      view : {
        id : 'main',
        url : 'scripts/playlist/mainplaylist/mainplaylist.html'

      },
      create : {
        id : 'create',
        url : 'scripts/playlist/add/addplaylist.html'

      },
      edit : {
        id : 'edit',
        url : 'scripts/playlist/edit/editplaylist.html'
      }
    };

    var cache = {
      currAction : this.action.view,
      songsSelectingList : {},
      listModel : {
        id : '',
        name : '',
        desc : '',
        listOfSongs: [],
        isSelected : false
      },
      reset : function () {
        this.listModel.id = '';
        this.listModel.name = '';
        this.listModel.desc = '';
        this.listModel.listOfSongs = [];
        this.listModel.isSelected = false;
        for(var i in this.songsSelectingList){
          this.songsSelectingList[i] = false;
        }
      }
    };
    this.cache = cache;

    init();

    function init() {
      //init selecting property
      var songs = SongService.listsong();
      for(var i in songs){
        cache.songsSelectingList[songs[i].id] = false;
      }
    }


  });
