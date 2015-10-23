
/*
Student dialog controller
 */
app.controller('uploads', ['$scope', '$mdDialog', 'Upload', '$routeParams', '$location', '$rootScope', function($scope, $mdDialog, Upload, $location, $rootScope){
    $scope.openUploads = function(ev){
        $mdDialog.show({
            controller: uploadFile,
            templateUrl: 'views/partials/dialogs/upload/upload.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function uploadFile($scope, $mdDialog, Upload, $location, $rootScope){

        var target = $location.path();

        // upload on file select or drop
        $scope.upload = function (file) {
            Upload.upload({
                url: '/api/upload',
                data: {file: file, target: target}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                $mdDialog.hide();
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            }).then(function redirect (){
                $rootScope.$broadcast('gotStudents')
            });
        };

        $scope.close = function() {
            $mdDialog.hide();
        }
    }
}]);