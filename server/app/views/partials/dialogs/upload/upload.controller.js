app.controller('uploads', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.openUploads = function(ev){
        $mdDialog.show({
            controller: uploadFile,
            templateUrl: 'views/partials/dialogs/upload.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function uploadFile($scope, $mdDialog){
        $scope.close = function() {
            $mdDialog.hide();
        }
    }
}]);