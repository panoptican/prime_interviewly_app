app.controller('interviewer', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.openInterviewer = function(ev){
        $mdDialog.show({
            controller: 'addInterviewer',
            templateUrl: 'views/partials/dialogs/interviewer.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function addInterviewer($scope, $mdDialog){
        $scope.close = function(){
            $mdDialog.hide();
        };
        $scope.cohorts = [
            {name: 'Delta'},
            {name: 'gamma'},
            {name: 'Epsilon'}
        ];
        $scope.events = [
            {name: 'mocks Delta'},
            {name: 'career Delta'},
            {name: 'mocks Epsilon'}
        ]
    }
}]);