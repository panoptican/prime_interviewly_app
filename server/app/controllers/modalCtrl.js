angular.module('app').controller('modalCtrl', function($scope, $mdDialog) {
  $scope.alert = '';
  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title('You are about to Archive this Event!')
        .content('Click to confirm. You can access this Event in Archived Events.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete this Event?')
      .content('This will permanently delete this Event.')
      .ariaLabel('delete')
      .ok('Yes, delete this Event!')
      .cancel('Phew, that was close!')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      $scope.alert = 'You deleted.';
    }, function() {
      $scope.alert = 'You did not delete';
    });
  };
});