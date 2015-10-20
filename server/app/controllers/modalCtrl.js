angular.module('app').controller('modalCtrl', function($scope, $mdDialog) {
  $scope.alert = '';
  $scope.showAlert = function (ev) {
    $mdDialog.show(
        $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('You are about to Archive this Event!')
            .content('Click to confirm. You can access this Event at any time in Archived Events.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
    );
  };
  $scope.showConfirm = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
        .title('Would you like to delete this Event?')
        .content('This will permanently delete this Event.')
        .ariaLabel('Confirm Dialog Demo')
        .targetEvent(ev)
        .ok('Yes, delete this Event!')
        .cancel('No way, that was close!');

    $mdDialog.show(confirm).then(function () {
      $scope.status = 'You deleted this event.';
    }, function () {
      $scope.status = 'You did not delete this event.';
    });
  };
  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };
});
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}