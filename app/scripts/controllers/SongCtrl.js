'use strict';

/**
 * @ngdoc function
 * @name myngappAppApp.controller:MyrouteCtrl
 * @description
 * # MyrouteCtrl
 * Controller of the myngappAppApp
 */

angular.module('myngappAppApp').controller('SongCtrl', function ($scope, SongService) {
  $scope.bread = 'Song';
  $scope.songs = SongService.list();
  $scope.selectedList = [];
  $scope.saveSong = function () {
    SongService.save($scope.newsong);
    $scope.newsong = {};
  }


  $scope.delete = function (id) {

    SongService.delete(id);
    if ($scope.newsong.id == id) $scope.newsong = {};
  }


  $scope.edit = function (id) {
    $scope.newsong = angular.copy(SongService.get(id));
  }
  $scope.CheckUncheckHeader = function () {
    $scope.IsAllChecked = true;
    for (var i = 0; i < $scope.songs.length; i++) {
      if (!$scope.songs[i].Selected) {
        $scope.IsAllChecked = false;
        break;
      }
    };
  };
  $scope.CheckUncheckHeader();

  $scope.CheckUncheckAll = function () {
    for (var i = 0; i < $scope.songs.length; i++) {
      $scope.songs[i].Selected = $scope.IsAllChecked;
    }
  };
  $scope.removeSelectedRows = function() {
    //start from last index because starting from first index cause shifting
    //in the array because of array.splice()
    for ( var i = 0; i < $scope.songs.length; i++) {
      if ($scope.m.Selected[i]) {
        //delete row from data
        $scope.songs.splice(i, 1);
        //delete rowSelection property
        delete $scope.m.Selected[i];
      }
    }
  };
});
