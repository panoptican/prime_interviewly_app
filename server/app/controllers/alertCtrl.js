angular.module('app').controller('alertCtrl', function($scope, $mdToast, $animate) {
    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };

    $scope.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
                .content('You have ARCHIVED this Event.')
                .position($scope.getToastPosition())
                .hideDelay(2000)
        );
    };
    $scope.showActionToast = function() {
        var toast = $mdToast.simple()
            .content('You are about to DELETE this Event!')
            .highlightAction(false)
            .position($scope.getToastPosition());
        $mdToast.show(toast).then(function() {
            alert('Click OK to confirm delete.');
        });
    };
});
