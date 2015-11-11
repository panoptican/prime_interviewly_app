app.controller('addInterviewers', ['$scope', '$http', '$mdDialog', 'items', '$routeParams', '$rootScope', function($scope, $http, $mdDialog, items, $routeParams, $rootScope){
    var eventParam = $routeParams._id;
    $scope.interviewers = items;

    $scope.add = function(id){
        $http.post('api/event/addInterviewer?_id=' + eventParam, {_id: id})
            .then(function(response){
                $rootScope.$broadcast('eventInterviewers');
            })
    };

    $scope.close = function(){
        $mdDialog.hide();
    }

}]);