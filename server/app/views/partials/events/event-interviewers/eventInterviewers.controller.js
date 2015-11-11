app.controller('eventInterviewers', ['$scope', '$http', '$routeParams', '$mdDialog', '$rootScope', function($scope, $http, $routeParams, $mdDialog, $rootScope){
    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    var getEventInterviewers = function(){
        $http.get('/api/event?_id=' + eventParam).then(function (response) {
            $scope.interviewers = response.data[0].interviewers;
        });
    };

    getEventInterviewers();

    $rootScope.$on('eventInterviewers', getEventInterviewers);

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
    };

    $scope.addInterviewerDialog = function(){
        $http.get('api/interviewer')
            .then(function(response){
                var interviewers = response.data;
                var addedInterviewers = $scope.interviewers;

                for(var i = 0; i < interviewers.length; i++){
                    addedInterviewers.forEach(function(interviewer){
                        if(interviewer._id == interviewers[i]._id){
                            interviewers.splice(i, 1);
                        }
                    });
                }

                $mdDialog.show({
                    controller: 'addInterviewers',
                    locals: {
                        items: interviewers
                    },
                    templateUrl: 'views/partials/dialogs/Event/addInterviewers.html',
                    parent: angular.element(document.body)
                })
            })
    };
}]);