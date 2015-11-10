
/*
 View events controller
 */
app.controller('viewEventCtrl', ['$scope', '$mdDialog' ,'$http', '$filter', '$routeParams', '$rootScope', function($scope, $mdDialog, $http, $filter, $routeParams, $rootScope) {

    var eventParam = $routeParams._id;
    $scope.eventId = eventParam;

    var getEvents = function(){
        $http.get('/api/event?_id=' + eventParam).then(function(response){
            var start = (response.data[0].startTime);
            var newStart = start.split(':');
            var hour = parseInt(newStart[0]);
            if(hour > 12){
                hour = hour  - 12;
                tod = "PM"
            }   else {
                tod = "AM"
            }
            var startTime =  hour + ":" +newStart[1]+" "+tod;

            var end = (response.data[0].endTime);
            var newEnd = end.split(':');
            var ehour = parseInt(newEnd[0]);
            if(ehour > 12){
                ehour = ehour  - 12;
                etod = "PM"
            }   else {
                etod = "AM"
            }
            var endTime =  ehour + ":" +newEnd[1]+" "+etod;
            console.log(startTime);
            $scope.event = {
                id: response.data[0]._id,
                cohort: response.data[0].cohort,
                type: response.data[0].type,
                date: $filter('date')(new Date(response.data[0].date), 'MM/dd/yy'),
                startTime: startTime,
                endTime: endTime,
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
                edit.startTime = $filter('date')(new Date(edit.startTime), 'HH:mm');
                edit.endTime = $filter('date')(new Date(edit.endTime), 'HH:mm');

                $http.put('api/event?_id=' + event.id, edit)
                    .then(function (response) {
                        $rootScope.$broadcast('getEvent');
                        $mdDialog.hide();
                    })
            };
        }
    }
}]);