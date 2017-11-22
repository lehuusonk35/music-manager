angular
  .module('myngappAppApp')
  .controller('dialogController', dialogController);

function dialogController ($scope, $mdDialog) {
  $scope.status = '';

  $scope.showConfirm = function(event) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure to delete the record?')
      .textContent('Record will be deleted permanently.')
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


}
