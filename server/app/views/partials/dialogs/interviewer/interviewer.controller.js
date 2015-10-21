
// Interviewer dialog controller
app.controller('interviewer', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.openInterviewer = function(ev){
        $mdDialog.show({
            controller: addInterviewer,
            templateUrl: 'views/partials/dialogs/interviewer/interviewer.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function addInterviewer($scope){
        $scope.close = function() {
            $mdDialog.hide();
            $scope.cohorts = [
                {name: 'Delta'},
                {name: 'gamma'},
                {name: 'Epsilon'}
            ];
            $scope.events = [
                {name: 'mocks Delta'},
                {name: 'career Delta'},
                {name: 'mocks Epsilon'}
            ];
        };
        $scope.submit = function(fname, lname, title, company, link, desc){
            var interviewer = {
                fName: fname,
                lName: lname,
                title: title,
                company: company,
                link: link,
                description: desc
            };
            console.log(interviewer);
        };
    }
}]);