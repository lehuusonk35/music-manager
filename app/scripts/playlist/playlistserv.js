'use strict';

/**
 * @ngdoc service
 * @name myngappAppApp.myService
 * @description
 * # myService
 * Service in the myngappAppApp.
 */
angular.module('myngappAppApp')
  .service('playListService', function () {
    var oid = 4;
    var lists = [
      {
        id: 0,
        name: 'Play list 01',
        desc: 'This is play list 01',
        listOfSongs:[{id: 0, name: 'Radioactive'},{id: 1,name: 'Rolling in the deep'}],
        isSelected:false
      },
      {
        id: 1,
        name: 'Play list 02',
        desc: 'This is play list 02',
        listOfSongs:[{id: 0, name: 'Radioactive'},{id: 2, name: 'Uninstall'}],
        isSelected:false
      },
      {
        id: 2,
        name: 'Play list 03',
        desc: 'This is play list 03',
        listOfSongs:[{id: 3, name: 'Viva la vida'},{id: 1,name: 'Rolling in the deep'}],
        isSelected:false
      },
      {
        id: 3,
        name: 'Play list 04',
        desc: 'This is play list 04',
        listOfSongs:[{id: 0, name: 'Radioactive'},{id: 3, name: 'Viva la vida'}],
        isSelected:false
      }
    ];
    this.save = function (list) {
      if( list.name !== '' && list.desc !== '' ){
        if ( list.id !== null  || list.id !== '') {
          list.id = oid++;
          lists.push(list);
        }
        else {
          for (var i = 0; i < lists.length; i++) {
            if (lists[i].id === list.id ) {
              lists[i] = list;
            }
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
        url : 'scripts/playlist/add/addplaylist.html'
      }
    };

    this.cache = {
      currAction : this.action.view,
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
        this.listModel.listOfSongs = '';
        this.listModel.isSelected = false;
      }
    };
  });
