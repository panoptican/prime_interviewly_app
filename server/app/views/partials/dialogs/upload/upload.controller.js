
/*
Student dialog controller
 */
app.controller('uploads', ['$scope', '$mdDialog', 'Upload', function($scope, $mdDialog, Upload){
    $scope.openUploads = function(ev){
        $mdDialog.show({
            controller: uploadFile,
            templateUrl: 'views/partials/dialogs/upload/upload.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function uploadFile($scope, $mdDialog, Upload){

        $scope.submit = function(file){
            var mine = {
                file: file
            };
        };
        $scope.close = function() {
            $mdDialog.hide();
        }
    }
}]);