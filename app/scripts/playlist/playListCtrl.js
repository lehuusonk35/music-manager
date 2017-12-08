'use strict';

/**
 * @ngdoc function
 * @name myngappAppApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the myngappAppApp
 */

angular.module('myngappAppApp').controller('playListCtrl', ['$scope', 'playListService', 'SongService', '$mdDialog' ,function ($scope, playListService, SongService, $mdDialog) {
  $scope.lists = playListService.list();
  $scope.listSongsAdd = $scope.songs = SongService.listsong();
  $scope.listSongsEdit = [];
  $scope.selectedList = [];
  $scope.selectedListEdit = [];
  $scope.selectedListNew = [];
  $scope.isSelectedAll = false;
  $scope.err = false;
  $scope.newlist = playListService.cache.listModel;
  $scope.templateObj = playListService.cache.currAction;

  $scope.savePlayList = function () {
    if ($scope.newlist.name !== '' && $scope.newlist.desc !== '') {
      playListService.save(angular.copy($scope.newlist));
      $scope.listSongsAdd = $scope.songs;
      $scope.isSelectedAll = allChecked();
      playListService.cache.reset();
      $scope.templateObj = playListService.cache.currAction = playListService.action.view;
      $scope.submitted = false;
      for(var i in $scope.newlist.listOfSongs){
        playListService.songsSelectingListNewList[$scope.newlist.listOfSongs[i].id] = false;
      }
    }
    else {
      $scope.submitted = true;
    }
  };
  $scope.editPlayList = function () {
    if ($scope.newlist.name !== '' && $scope.newlist.desc !== '') {
      playListService.edit(angular.copy($scope.newlist));
      $scope.listSongsAdd = $scope.songs;
      $scope.isSelectedAll = allChecked();

      playListService.cache.reset();
      $scope.templateObj = playListService.cache.currAction = playListService.action.view;
      $scope.submitted = false;
      for(var i in $scope.newlist.listOfSongs){
        playListService.songsSelectingListNewList[$scope.newlist.listOfSongs[i].id] = false;
      }

    }
    else {
      $scope.submitted = true;
    }
  };
  $scope.delete = function (id) {
    var confirm = $mdDialog.confirm()
      .title('Delete song')
      .textContent('Are you sure you want delete this song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      playListService.delete(id);
      $scope.selectedList = [];
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };
  $scope.edit = function (id) {

    for (var i = 0; i < $scope.lists.length; i ++) {
      if ($scope.lists[i].id === id) {
        // $scope.listSongsEdit = _.differenceWith($scope.songs, $scope.lists[i].listOfSongs, _.isEqual);
        $scope.listSongsEdit = _.differenceWith($scope.songs, $scope.lists[i].listOfSongs, function (o1, o2) {
          return o1['id'] === o2['id']
        });
        break;
      }
    }
    $scope.newlist.isSelected = false;
    var list = angular.copy(playListService.get(id));
    playListService.cache.listModel = list;
    $scope.newlist = playListService.cache.listModel;
    $scope.templateObj = playListService.cache.currAction = playListService.action.edit;
    for(var i in $scope.listSongsEdit){
      playListService.songsSelectingListEditList[$scope.listSongsEdit[i].id] = false;
    }
    for(var i in $scope.newlist.listOfSongs){
      playListService.songsSelectingListNewList[$scope.newlist.listOfSongs[i].id] = false;
    }
  };


  $scope.selectAllList = function(){
    $scope.isSelectedAllList= !$scope.isSelectedAllList;
    $scope.selectedList = [];
    for(var i =0;i<$scope.lists.length;i++){
      $scope.lists[i].isSelected = $scope.isSelectedAllList;
      if($scope.lists[i].isSelected){
        $scope.selectedList.push($scope.lists[i]);
      }
    }
  };

  $scope.selectList = function(list){
    list.isSelected=!list.isSelected;
    if(list.isSelected){
      $scope.selectedList.push(list);
    }
    else {
      for(var i =0;i<$scope.selectedList.length;i++){
        if($scope.selectedList[i].id === list.id){
          $scope.selectedList.splice(i,1);
          break;
        }
      }
    }
    $scope.isSelectedAllList = allChecked();
  };

  function allChecked(){
    var result = true;
    for(var i =0;i<$scope.lists.length;i++){
      if(!$scope.lists[i].isSelected){
        result = false;
        break;
      }
    }

    return result;
  }
  $scope.status = '';

  $scope.showConfirm = function(event) {
    var confirm = $mdDialog.confirm()
      .title('Delete multiple songs')
      .textContent('Are you sure you want delete this selected song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.selectedList.length; i++) {
        var id = $scope.selectedList[i].id;
        playListService.delete(id);
      }
      $scope.selectedList = [];
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };


  $scope.addPage = function () {
    $scope.songs.isSelected = false;
    $scope.newlist = playListService.cache.listModel;
    $scope.templateObj = playListService.cache.currAction = playListService.action.create;
  };
  $scope.mainPlayList = function () {

    $scope.listSongsAdd = $scope.songs;
    $scope.templateObj = playListService.cache.currAction = playListService.action.view;
    for(var i in $scope.newlist.listOfSongs){
      playListService.songsSelectingListNewList[$scope.newlist.listOfSongs[i].id] = false;
    }
    playListService.cache.reset();
  };
  $scope.selectAllSongs = function(){
    $scope.isSelectedAll= !$scope.isSelectedAll;
    $scope.selectedList = [];
    for(var i in playListService.cache.songsSelectingList){
      playListService.cache.songsSelectingList[i] = $scope.isSelectedAll;
      if(playListService.cache.songsSelectingList[i]){
        var idx = Object.keys(playListService.cache.songsSelectingList).indexOf(i);
        $scope.selectedList.push($scope.songs[idx]);
      }
    }
  };


  $scope.selectSong = function(song){
    // song.isSelected=!song.isSelected;
    playListService.cache.songsSelectingList[song.id] = !playListService.cache.songsSelectingList[song.id];
    if(playListService.cache.songsSelectingList[song.id]){
      $scope.selectedList.push(song);
    }
    else {
      for(var i =0;i<$scope.selectedList.length;i++){
        if($scope.selectedList[i].id === song.id){
          $scope.selectedList.splice(i,1);
          break;
        }
      }
    }
    $scope.isSelectedAll = allCheckedSongs();
  };

  $scope.isSelectedSong = function (songId) {
    return playListService.cache.songsSelectingList[songId];
  };

  function allCheckedSongs(){
    for(var i in playListService.cache.songsSelectingList){
      if(!playListService.cache.songsSelectingList[i]){
        return false
      }
    }
    return true;
  }


  $scope.addSongAdd = function(event) {
    var confirm = $mdDialog.confirm()
      .title('Delete multiple songs')
      .textContent('Are you sure you want delete this selected song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.selectedList.length; i++) {
        /*var id = $scope.selectedList[i].id;
        var name = $scope.selectedList[i].name;
        var artist = $scope.selectedList[i].artist;*/
        // $scope.selectedList.name.push($scope.lists.listOfSongs[i]);
        $scope.newlist.listOfSongs.push($scope.selectedList[i]);
        $scope.newlist.listOfSongs = _.unionBy($scope.newlist.listOfSongs, 'id');
        // SongService.delete(id);
      }
      deleteSong();
      for(var i in $scope.newlist.listOfSongs){
        playListService.songsSelectingListNewList[$scope.newlist.listOfSongs[i].id] = false;
      }
      for(var i in playListService.cache.songsSelectingList){
        playListService.cache.songsSelectingList[i] = false;
      }
      $scope.selectedList = [];
      $scope.isSelectedAll = false;
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.addSongToListAdd = function (id) {
    var confirm = $mdDialog.confirm()
      .title('Delete song')
      .textContent('Are you sure you want delete this song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {

      for (var i = 0; i < $scope.songs.length; i++) {
        if ($scope.songs[i].id === id) {
          //
          // var name = $scope.songs[i].name;
          // var artist = $scope.songs[i].artist;
          $scope.newlist.listOfSongs.push($scope.songs[i]);
          deleteSong();
        }
        $scope.newlist.listOfSongs = _.unionBy($scope.newlist.listOfSongs, 'id');
      }
      for(var i in $scope.newlist.listOfSongs){
        playListService.songsSelectingListNewList[$scope.newlist.listOfSongs[i].id] = false;
      }
      removeItemFromSelectedList(id);
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  function removeItemFromSelectedList(id) {
    for(var i in $scope.selectedList){
      if($scope.selectedList[i].id === id){
        $scope.selectedList.splice(i, 1);
        break;
      }
    }
  }

  function removeItemFromSelectedListNew(id) {
    for(var i in $scope.selectedListNew){
      if($scope.selectedListNew[i].id === id){
        $scope.selectedListNew.splice(i, 1);
        break;
      }
    }
  }

  $scope.addSongEdit = function(event) {
    var confirm = $mdDialog.confirm()
      .title('Delete multiple songs')
      .textContent('Are you sure you want delete this selected song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.selectedList.length; i++) {
        /*var id = $scope.selectedList[i].id;
        var name = $scope.selectedList[i].name;
        var artist = $scope.selectedList[i].artist;*/
        // $scope.selectedList.name.push($scope.lists.listOfSongs[i]);
        $scope.newlist.listOfSongs.push($scope.selectedList[i]);
        $scope.newlist.listOfSongs = _.unionBy($scope.newlist.listOfSongs, 'id');
      }
      deleteSongsInListEdit();
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.addSongToListEdit = function (id) {
    var confirm = $mdDialog.confirm()
      .title('Delete song')
      .textContent('Are you sure you want delete this song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      for (var i = 0; i < $scope.listSongsEdit.length; i++) {
        if ($scope.listSongsEdit[i].id === id) {
          /*var name = $scope.songs[i].name;
          var artist = $scope.songs[i].artist;*/
          $scope.newlist.listOfSongs.push($scope.listSongsEdit[i]);

        }
        $scope.newlist.listOfSongs = _.unionBy($scope.newlist.listOfSongs, 'id');
      }

      deleteSongsInListEdit();
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.isSelectAnyItemsFromAdd = function () {
    return $scope.selectedList.length > 0;
  };
  $scope.isSelectAnyItemsFromNew = function () {
    return $scope.selectedListNew.length > 0;
  };

  $scope.addSongEdit = function(event) {
    var confirm = $mdDialog.confirm()
      .title('Delete multiple songs')
      .textContent('Are you sure you want delete this selected song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.selectedListEdit.length; i++) {
        /*var id = $scope.selectedList[i].id;
         var name = $scope.selectedList[i].name;
         var artist = $scope.selectedList[i].artist;*/
        // $scope.selectedList.name.push($scope.lists.listOfSongs[i]);
        $scope.newlist.listOfSongs.push($scope.selectedListEdit[i]);
        $scope.newlist.listOfSongs = _.unionBy($scope.newlist.listOfSongs, 'id');
      }
      for(var i in $scope.listSongsEdit){
        playListService.songsSelectingListEditList[$scope.listSongsEdit[i].id] = false;
      }
      for(var i in $scope.newlist.listOfSongs){
        playListService.songsSelectingListNewList[$scope.newlist.listOfSongs[i].id] = false;
      }
      $scope.selectedListEdit = [];
      $scope.isSelectedAllEdit = false;
      deleteSongsInListEdit();
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.delSongEdit = function(id) {
    var confirm = confirmDialog('Đây là xóa 1 bài nha !','Xóa là mất luôn đó ! Chắc xóa không ?');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.newlist.listOfSongs.length; i++) {
        if($scope.newlist.listOfSongs[i].id === id) {
          $scope.newlist.listOfSongs.splice(i, 1);
        }
      }
      pushSongsInListEdit();
      for(var i in $scope.listSongsEdit){
        playListService.songsSelectingListEditList[$scope.listSongsEdit[i].id] = false;
      }
      $scope.selectedListEdit = [];
      $scope.isSelectedAllEdit = false;
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.delSongEditAll = function(event) {
    var confirm = confirmDialog('Đây là xóa nhiều bài 1 lúc nhé !','Không nên nhé ! Nếu tiếp tục thì bấm Ok');
    $mdDialog.show(confirm).then(function() {
      $scope.newlist.listOfSongs = _.differenceWith($scope.newlist.listOfSongs, $scope.selectedListNew, function (o1, o2) {
        return o1['id'] === o2['id']
      });
      // $scope.listSongsEdit = $scope.selectedListNew;
      //$scope.selectedListNew = [];
      $scope.isSelectedAllNewList = false;
      for(var i in $scope.selectedListNew){
        playListService.songsSelectingListNewList[$scope.selectedListNew[i].id] = false;
      }
      $scope.selectedListNew = [];
      pushSongsInListEdit();
      for(var i in $scope.listSongsEdit){
        if($scope.listSongsEdit[i].id) {
          playListService.songsSelectingListEditList[$scope.listSongsEdit[i].id] = false;
        }
      }
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.delSongAdd = function(id) {
    var confirm = confirmDialog('Đây là xóa 1 bài nha !','Xóa là mất luôn đó ! Chắc xóa không ?');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.newlist.listOfSongs.length; i++) {
        if($scope.newlist.listOfSongs[i].id === id) {
          $scope.listSongsAdd.push($scope.newlist.listOfSongs[i]);
          $scope.newlist.listOfSongs.splice(i, 1);
        }
      }
      // $scope.selectedListNew = [];
      // $scope.isSelectedAllNewList = false;
      removeItemFromSelectedListNew(id);
      // pushSongsInListAdd();
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.delSongAddAll = function(event) {
    var confirm = confirmDialog('Đây là xóa nhiều bài 1 lúc nhé !','Không nên nhé ! Nếu tiếp tục thì bấm Ok');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.selectedListNew.length; i++) {
        $scope.listSongsAdd.push($scope.selectedListNew[i]);
        $scope.newlist.listOfSongs.splice(findIndexInArray($scope.newlist.listOfSongs, $scope.selectedListNew[i]), 1);
      }
      $scope.selectedListNew = [];
      $scope.isSelectedAllNewList = false;
      //pushSongsInListAdd();
      // $scope.listSongsAdd = _.differenceWith($scope.newlist.listOfSongs, $scope.selectedListNew, function (o1, o2) {
      //   return o1['id'] === o2['id']
      // });


    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  function findIndexInArray(array, obj){
    for(var i in array){
      if(array[i] === obj){
        return i;
      }
    }
    return -1;
  }

  function deleteSong() {
    $scope.listSongsAdd = _.differenceWith($scope.listSongsAdd, $scope.newlist.listOfSongs, function (o1, o2) {
      return o1['id'] === o2['id']
    });
  }
  function confirmDialog(title, textContent) {
    return $mdDialog.confirm()
      .title(title)
      .textContent(textContent)
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
  }
  function deleteSongsInListEdit() {
    $scope.listSongsEdit = _.differenceWith($scope.listSongsEdit, $scope.newlist.listOfSongs, function (o1, o2) {
      return o1['id'] === o2['id']
    });
  }
  function pushSongsInListEdit() {
    $scope.listSongsEdit = _.differenceWith($scope.listSongsAdd, $scope.newlist.listOfSongs, function (o1, o2) {
      return o1['id'] === o2['id']
    });
  }


  $scope.selectAllListSongs = function(){
    $scope.isSelectedAllNewList= !$scope.isSelectedAllNewList;
    $scope.selectedListNew = [];
    for(var i in playListService.songsSelectingListNewList){
      playListService.songsSelectingListNewList[i] = $scope.isSelectedAllNewList;
      if(playListService.songsSelectingListNewList[i]){
        var idx = Object.keys(playListService.songsSelectingListNewList).indexOf(i);
        $scope.selectedListNew.push($scope.newlist.listOfSongs[idx]);
      }
    }
  };

  $scope.selectASongList = function(song){
    playListService.songsSelectingListNewList[song.id] = !playListService.songsSelectingListNewList[song.id];
    if(playListService.songsSelectingListNewList[song.id]){
      $scope.selectedListNew.push(song);
    }
    else {
      for(var i =0;i<$scope.selectedListNew.length;i++){
        if($scope.selectedListNew[i].id === song.id){
          $scope.selectedListNew.splice(i,1);
          break;
        }
      }
    }
    $scope.isSelectedAllNewList = allCheckedOneList();
  };

  $scope.isSelectedOneList = function (songId) {
    return playListService.songsSelectingListNewList[songId];
  };

  function allCheckedOneList(){
    for(var i in playListService.songsSelectingListNewList){
      if(!playListService.songsSelectingListNewList[i]){
        return false
      }
    }
    return true;
  }



  $scope.selectAllSongsEdit = function(){
    $scope.isSelectedAllEdit = !$scope.isSelectedAllEdit;
    $scope.selectedListEdit = [];
    for(var i in playListService.songsSelectingListEditList){

      playListService.songsSelectingListEditList[i] = $scope.isSelectedAllEdit;
      if(playListService.songsSelectingListEditList[i]){
        var idx = Object.keys(playListService.songsSelectingListEditList).indexOf(i);
        if($scope.listSongsEdit[idx]){
          $scope.selectedListEdit.push($scope.listSongsEdit[idx]);
        }
      }
    }
  };

  $scope.selectSongEdit = function(song){
    playListService.songsSelectingListEditList[song.id] = !playListService.songsSelectingListEditList[song.id];
    if(playListService.songsSelectingListEditList[song.id]){
      $scope.selectedListEdit.push(song);
    }
    else {
      for(var i =0;i<$scope.selectedListEdit.length;i++){
        if($scope.selectedListEdit[i].id === song.id){
          $scope.selectedListEdit.splice(i,1);
          break;
        }
      }
    }
    $scope.isSelectedAllEdit = allCheckedOneListEdit();
  };

  $scope.isSelectedSongEdit = function (songId) {
    return playListService.songsSelectingListEditList[songId];
  };

  function allCheckedOneListEdit (){
    for(var i in playListService.songsSelectingListEditList){
      if(!playListService.songsSelectingListEditList[i]){
        return false
      }
    }
    return true;
  }



}]);

