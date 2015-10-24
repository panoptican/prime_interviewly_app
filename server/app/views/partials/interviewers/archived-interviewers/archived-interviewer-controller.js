app.controller('ArchInterviewers', ['$scope', '$http', function($scope, $http){

    $http.get('api/interviewer/archived').then(function(response){
        $scope.interviewers = response.data;
    });

    $scope.unarchive = function(id){
        $http.post('api/interviewer/archive?_id='+id, {isArchived: false}).then(function(response){
            $http.get('api/interviewer/archived').then(function(response){
                $scope.interviewers = response.data;
            });
        })
    }
}]);