app.controller('addInterviewer', ['$scope', '$http', '$routeParams', '$mdDialog', '$rootScope', function($scope, $http, $routeParams, $mdDialog, $rootScope){
    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    var getEventInterviewers = function(){
        $http.get('/api/event?_id=' + eventParam).then(function (response) {
            $scope.interviewers = response.data[0].interviewers;
        });
    };

    getEventInterviewers();

    $scope.remove = function(id){
        $http.post('api/event/removeInterviewer?_id=' + eventParam, {_id: id}).then(function(response){
            if(response.status == 200){
                getEventInterviewers();
            }
        })
    };

    $scope.editAvailability = function(id){
        $http.get('api/interviewer?_id=' + id)
            .then(function(response){
                $scope.interviewer = response.data[0];
                $mdDialog.show({
                    controller: 'availability',
                    locals: {
                        event: $scope.eventId,
                        items: $scope.interviewer
                    },
                    templateUrl: 'views/partials/dialogs/availability/availability.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true
                })
            })
    }
}]);