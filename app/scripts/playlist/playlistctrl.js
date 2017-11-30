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
  $scope.songs = SongService.listsong();
  $scope.listSongsEdit = [];
  $scope.selectedList = [];
  $scope.isSelectedAll = false;
  $scope.err = false;
  $scope.newlist = playListService.cache.listModel;
  $scope.templateObj = playListService.cache.currAction;

  $scope.saveSong = function () {
    if ($scope.newlist.name !== '' && $scope.newlist.desc !== '') {
      playListService.save(angular.copy($scope.newlist));
      $scope.isSelectedAll = allChecked();
      playListService.cache.reset();
      $scope.templateObj = playListService.cache.currAction = playListService.action.view;
      $scope.submitted = false;
    }
    else {
      //alert('cant song name and song artist empty ');
      $scope.submitted = true;
    }
    //window.location = "#!/song";
    //$location.path('#!/song');
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
        $scope.listSongsEdit = _.differenceWith($scope.songs, $scope.lists[i].listOfSongs, _.isEqual);

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
  $scope.mainSong = function () {
    //$scope.newsong = null;
    playListService.cache.reset();
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
  $scope.addSong = function(event) {
    var confirm = $mdDialog.confirm()
      .title('Delete multiple songs')
      .textContent('Are you sure you want delete this selected song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      for ( var i = 0; i < $scope.selectedList.length; i++) {
        var id = $scope.selectedList[i].id;
        var name = $scope.selectedList[i].name;
        var artist = $scope.selectedList[i].artist;
        // $scope.selectedList.name.push($scope.lists.listOfSongs[i]);
        $scope.newlist.listOfSongs.push({id: id,name: name, artist: artist});
        $scope.newlist.listOfSongs = _.unionBy($scope.newlist.listOfSongs, 'id');
      }
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };

  $scope.addSongToList = function (id) {
    var confirm = $mdDialog.confirm()
      .title('Delete song')
      .textContent('Are you sure you want delete this song ?')
      .targetEvent(event)
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      for (var i = 0; i < $scope.songs.length; i++) {
        if ($scope.songs[i].id === id) {
          var name = $scope.songs[i].name;
          var artist = $scope.songs[i].artist;
          $scope.newlist.listOfSongs.push({id: id,name: name, artist: artist});
        }
        $scope.newlist.listOfSongs = _.unionBy($scope.newlist.listOfSongs, 'id');
      }
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  }
}]);

