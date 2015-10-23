app.controller('addInterviewer', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $http.get('/api/interviewer').then(function (response) {
        console.log(response);
        $scope.interviewers = response.data;
    });
    $http.get('/api/event?_id='+$routeParams._id).then(function(response){
        var added = response.data[0].interviewers.slice();
        var interviewers = $scope.interviewers;
        for(var i = 0; i < interviewers.length; i++){
            var interviewer = interviewers[i];
            for(var j = 0; j < added.length; j++){
                if(interviewer._id === added[j]._id){
                    interviewer.added = true;
                }
            }
        }
        console.log($scope.added);
        console.log($scope.students);

    });

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;
    console.log(eventParam);
    console.log($routeParams);

    $scope.addInterviewer = function(id) {
        $http({
            method: 'POST',
            url: '/api/event/addInterviewer?_id=' + eventParam,
            data: {_id: id}
        }).then(function success(response) {
            var added = response.data.interviewers.slice();
            var interviewers = $scope.interviewers;
            for(var i = 0; i < interviewers.length; i++){
                var interviewer = interviewers[i];
                for(var j = 0; j < added.length; j++){
                    if(interviewer._id === added[j]._id){
                        interviewer.added = true;
                    }
                }
            }
        }, function error() {
        }).then(function redirect() {
            // hide row
        });
    };
    $scope.remove = function(id){
        var interviewers = $scope.interviewers;
        for(var i=0; i <interviewers.length; i++){
            var interviewer = interviewers[i];
            if(interviewer._id === id){
                interviewer.added = false;
            }
        }
        var event = $routeParams._id;
        $http.post('api/event/removeInterviewer?_id='+event, {_id: id}).then(function(response){
            console.log(response);
        })
    }
}]);