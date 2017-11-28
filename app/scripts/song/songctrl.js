'use strict';

/**
 * @ngdoc function
 * @name myngappAppApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the myngappAppApp
 */

angular.module('myngappAppApp').controller('SongCtrl', ['$scope', 'SongService', '$mdDialog' ,function ($scope, SongService, $mdDialog) {
  $scope.songs = SongService.list();
  $scope.bread = 'Song';
  $scope.title = 'Manage Songs';
  $scope.selectedList = [];
  $scope.isSelectedAll = SongService.isSelectedAll.check;
  $scope.err = false;
  $scope.newsong = SongService.cache.songModel;
  $scope.templateObj = SongService.cache.currAction;
  $scope.saveSong = function () {
    if ($scope.newsong.name !== '' && $scope.newsong.artist !== '') {
      SongService.save(angular.copy($scope.newsong));
      $scope.isSelectedAll = allChecked();
      SongService.cache.reset();
      $scope.templateObj = SongService.cache.currAction = SongService.action.view;
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
      SongService.delete(id);
    }, function() {
      $scope.status = 'You decided to keep your record.';
    });
  };
  $scope.edit = function (id) {
    // console.log($scope.selectedList);
    var song = angular.copy(SongService.get(id));
    SongService.cache.songModel = song;
    $scope.newsong = SongService.cache.songModel;
    $scope.templateObj = SongService.cache.currAction = SongService.action.edit;
    /*$scope.templateObj = {
      url: 'scripts/song/add/add.template.html',
      id: 'edit'
    }*/
  };
  $scope.selectAll = function(){
    $scope.isSelectedAll= !$scope.isSelectedAll;
    $scope.selectedList = [];
    for(var i =0;i<$scope.songs.length;i++){
      $scope.songs[i].isSelected = $scope.isSelectedAll;
      if($scope.songs[i].isSelected){
        $scope.selectedList.push($scope.songs[i]);
      }
    }
  };

  $scope.selectSong = function(song){
    song.isSelected=!song.isSelected;
    if(song.isSelected){
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
    $scope.isSelectedAll = allChecked();
  };

  function allChecked(){
    var result = true;
    for(var i =0;i<$scope.songs.length;i++){
      if(!$scope.songs[i].isSelected){
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
        SongService.delete(id);
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
    $scope.newsong = SongService.cache.songModel;
    $scope.templateObj = SongService.cache.currAction = SongService.action.create;
    // $scope.templateObj = {
    //   url: 'scripts/song/add/add.template.html',
    //   id: 'create'
    // }
  };
  $scope.mainSong = function () {
    //$scope.newsong = null;
    SongService.cache.reset();
    $scope.templateObj = SongService.cache.currAction = SongService.action.view;
    /*$scope.templateObj = {
      url: 'scripts/song/mainsong/mainsong.html',
      id: 'main'
    }*/
  };
}]);
