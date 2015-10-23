
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

        // upload on file select or drop
        $scope.upload = function (file) {
            console.log(file);
            Upload.upload({
                url: '/api/upload',
                data: {file: file}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        $scope.close = function() {
            $mdDialog.hide();
        }
    }
}]);