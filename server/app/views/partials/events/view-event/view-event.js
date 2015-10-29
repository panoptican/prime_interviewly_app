
/*
 View events controller
 */
app.controller('viewEventCtrl', ['$scope', '$mdDialog' ,'$http', '$filter', '$routeParams', '$rootScope', function($scope, $mdDialog, $http, $filter, $routeParams, $rootScope) {

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    var getEvents = function(){
        $http.get('/api/event?_id=' + eventParam).then(function(response){
            $scope.event = {
                id: response.data[0]._id,
                cohort: response.data[0].cohort,
                type: response.data[0].type,
                date: $filter('date')(new Date(response.data[0].date), 'MM/dd/yy'),
                startTime: response.data[0].startTime,
                endTime: response.data[0].endTime,
                interviewDuration: response.data[0].interviewDuration
            };
        });
    };

    $rootScope.$on('getEvent', function(){
        getEvents();
    });

    getEvents();

    $scope.edit = function() {
        $http.get('/api/event?_id=' + eventParam).then(function(response){

            $scope.event2 = {
                id: response.data[0]._id,
                cohort: response.data[0].cohort,
                type: response.data[0].type,
                date: $filter('date')(new Date(response.data[0].date), 'MM/dd/yy'),
                startTime: response.data[0].startTime,
                endTime: response.data[0].endTime,
                interviewDuration: response.data[0].interviewDuration
            };

            $mdDialog.show({
                controller: editEvent,
                locals: {
                  items: $scope.event2
                },
                templateUrl: 'views/partials/dialogs/Event/editEvent.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        });


        function editEvent($scope, $mdDialog, $http, items, $rootScope) {
            var event = items;
            $scope.close = function () {
                $mdDialog.hide();
            };

            $scope.edit = function (edit) {
                edit._id = event.id;
                edit.startTime = $filter('date')(new Date(event.startTime), 'HH:mm');
                edit.endTime = $filter('date')(new Date(event.endTime), 'HH:mm');

                $http.put('api/event?_id=' + event.id, edit)
                    .then(function (response) {
                        $rootScope.$broadcast('getEvent');
                        $mdDialog.hide();
                    })
            };
        }
    }
}]);