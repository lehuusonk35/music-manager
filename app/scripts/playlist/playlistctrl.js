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
  $scope.selectedListAdd = [];
  $scope.selectedListEdit = [];
  $scope.selectedListNewList = [];
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
    /*$scope.templateObj = {
     url: 'scripts/song/add/add.template.html',
     id: 'edit'
     }*/
  };
  $scope.selectAllSongsEdit = function () {
    $scope.isSelectedAll= !$scope.isSelectedAll;
    $scope.selectedListEdit = [];
    for(var i =0;i<$scope.lists.length;i++){
      $scope.selectedListEdit[i].isSelectedSong = $scope.isSelectedAll;
      if($scope.listSongsEdit[i].isSelectedSong){
        $scope.selectedListEdit.push($scope.listSongsEdit[i]);
      }
    }
  };
  $scope.selectAllList = function(){
    $scope.isSelectedAll= !$scope.isSelectedAll;
    $scope.selectedList = [];
    for(var i =0;i<$scope.lists.length;i++){
      $scope.lists[i].isSelected = $scope.isSelectedAll;
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
    $scope.isSelectedAll = allChecked();
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
  // $scope.prova = function(){
  //   for(var i =0;i<$scope.songs.length;i++){
  //     if($scope.songs[i].isSelected){
  //       return true;
  //     }
  //   }
  // };
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
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  /*$scope.templateObj = {
   url: 'scripts/song/mainsong/mainsong.html',
   id: 'main'
   };*/

  $scope.addPage = function () {
    $scope.songs.isSelected = false;
    $scope.newlist = playListService.cache.listModel;
    $scope.templateObj = playListService.cache.currAction = playListService.action.create;
    // $scope.templateObj = {
    //   url: 'scripts/song/add/add.template.html',
    //   id: 'create'
    // }
  };
  $scope.mainPlayList = function () {
    //$scope.newsong = null;
    playListService.cache.reset();
    $scope.listSongsAdd = $scope.songs;
    $scope.templateObj = playListService.cache.currAction = playListService.action.view;
    /*$scope.templateObj = {
     url: 'scripts/song/mainsong/mainsong.html',
     id: 'main'
     }*/
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
    // for(var i =0;i<$scope.songs.length;i++){
    //   $scope.songs[i].isSelected = $scope.isSelectedAll;
    //   if($scope.songs[i].isSelected){
    //     $scope.selectedList.push($scope.songs[i]);
    //   }
    // }
  };

  $scope.isSelectedSong = function (songId) {
    return playListService.cache.songsSelectingList[songId];
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

  function allCheckedSongs(){
    for(var i in playListService.cache.songsSelectingList){
      if(!playListService.cache.songsSelectingList[i]){
        return false
      }
    }
    return true;
    /*var result = true;
    for(var i =0;i<$scope.songs.length;i++){
      if(!$scope.songs[i].isSelected){
        result = false;
        break;
      }
    }

    return result;*/
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
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

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

  $scope.delSongEdit = function(id) {
    var confirm = confirmDialog('xoa 1 bai','day la chac xoa nha');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.newlist.listOfSongs.length; i++) {
        if($scope.newlist.listOfSongs[i].id === id) {
          $scope.newlist.listOfSongs.splice(i, 1);
        }
      }
      pushSongsInListEdit();
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.delSongEditAll = function(event) {
    var confirm = confirmDialog('','');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.selectedList.length; i++) {
        $scope.newlist.listOfSongs = _.differenceWith($scope.newlist.listOfSongs, $scope.selectedList, function (o1, o2) {
          return o1['id'] === o2['id']
        });
      }
      pushSongsInListEdit();
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

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


}]);

