
/*
 View events controller
 */
app.controller('viewEventCtrl', ['$scope', '$mdDialog' ,'$http', '$filter', '$routeParams', function($scope, $mdDialog, $http, $filter, $routeParams) {

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    $http.get('/api/event?_id=' + eventParam).then(function success(response) {

        $scope.event = {
            id: response.data[0]._id,
            title: response.data[0].cohort,
            type: response.data[0].type,
            date: $filter('date')(new Date(response.data[0].date), 'MM/dd/yy'),
            startTime: response.data[0].startTime,
            endTime: response.data[0].endTime,
            interviewDuration: response.data[0].interviewDuration
        }

    }, function error() {
    });

    $scope.edit = function(event) {
            $scope.event = event;
            $mdDialog.show({
                controller: editEvent,
                locals: {
                    items: $scope.event
                },
                templateUrl: 'views/partials/dialogs/Event/editEvent.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        function editEvent($scope, $mdDialog, $http, items) {
            $scope.event = items;
            console.log(items);
            $scope.close = function () {
                $mdDialog.hide();
            };
            $scope.submit = function (event) {
                $http.put('api/event?_id=' + event._id, event)
                    .then(function (response) {
                        $mdDialog.hide();
                    })
            };
        }
    }
}]);