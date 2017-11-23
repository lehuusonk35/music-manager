// 'use strict';
//
// /**
//  * @ngdoc function
//  * @name myngappAppApp.controller:MyrouteCtrl
//  * @description
//  * # MyrouteCtrl
//  * Controller of the myngappAppApp
//  */
//
// angular.module('myngappAppApp').controller('SongCtrl', function ($scope, SongService, $mdDialog, $location) {
//   $scope.songs = SongService.list();
//   $scope.selectedList = [];
//   $scope.isSelectedAll = false;
//   $scope.saveSong = function () {
//     SongService.save($scope.newsong);
//     $scope.newsong = {};
//     $scope.isSelectedAll = allChecked();
//     //window.location = "#!/song";
//     $location.path('#!/song');
//   };
//   $scope.delete = function (id) {
//     SongService.delete(id);
//   };
//   $scope.edit = function (id) {
//     // console.log($scope.selectedList);
//     $scope.newsong = angular.copy(SongService.get(id));
//   };
//   $scope.selectAll = function(){
//     $scope.isSelectedAll= !$scope.isSelectedAll;
//     $scope.selectedList = [];
//     for(var i =0;i<$scope.songs.length;i++){
//       $scope.songs[i].isSelected = $scope.isSelectedAll;
//       if($scope.songs[i].isSelected){
//         $scope.selectedList.push($scope.songs[i]);
//       }
//     }
//   };
//
//   $scope.selectSong = function(song){
//     song.isSelected=!song.isSelected;
//     if(song.isSelected){
//       $scope.selectedList.push(song);
//     }
//     else {
//       for(var i =0;i<$scope.selectedList.length;i++){
//         if($scope.selectedList[i].id === song.id){
//           $scope.selectedList.splice(i,1);
//         }
//       }
//     }
//     $scope.isSelectedAll = allChecked();
//   };
//
//   function allChecked(){
//     var result = true;
//     for(var i =0;i<$scope.songs.length;i++){
//       if(!$scope.songs[i].isSelected){
//         result = false;
//         break;
//       }
//     }
//
//     return result;
//   }
//   $scope.prova = function(){
//     for(var i =0;i<$scope.songs.length;i++){
//       if($scope.songs[i].isSelected){
//         return true;
//       }
//     }
//   };
//   $scope.status = '';
//
//   $scope.showConfirm = function(event) {
//     var confirm = $mdDialog.confirm()
//       .title('Are you sure to delete the record?')
//       .textContent('Record will be deleted permanently.')
//       .targetEvent(event)
//       .ok('Yes')
//       .cancel('No');
//     $mdDialog.show(confirm).then(function() {
//       for ( var i = 0; i < $scope.selectedList.length; i++) {
//         var id = $scope.selectedList[i].id;
//         SongService.delete(id);
//       }
//     }, function() {
//       $scope.status = 'You decided to keep your record.';
//     });
//   };
// });
