/*
Archived events controller
 */
app.controller('archivedEventsCtrl', ['$scope', '$http', '$filter', '$rootScope', function($scope, $http, $filter, $rootScope) {
    var archived = function(){
        $http.get('/api/event?isArchived=true').then(function success(response) {

            // set get request to a variable
            eventsList = response.data;

            // initialize an empty array for storing data to be used in ng-repeat
            var tiles = [];

            // iterate over response data and push objects into array for ng-repeat
            eventsList.forEach(function(item, pos) {
                tiles.push({title: title = item.cohort + ' ' + item.type, date: $filter('date')(new Date(item.date), 'MM/dd/yy'), _id: item._id});
            });

            // set scope tiles equal to the object array
            $scope.tiles = tiles;

        }, function error() {});
    };
    archived();
    $rootScope.$on('got/archivedEvents', function(){
        archived();
    })
}]);

app.controller('archivedEventsModal', ['$scope', '$mdDialog', '$http', '$rootScope', function($scope, $mdDialog, $http, $rootScope) {
    $scope.alert = '';

    $scope.deleteEvent = function (id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this Event?')
            .content('This will permanently delete this Event.')
            .ariaLabel('Delete')
            .ok('Yes, delete this Event!')
            .cancel('No way, that was close!');

        $mdDialog.show(confirm).then(function () {
            $http.delete('api/event?_id=' + id)
                .then(function(response){
                    $scope.status = 'You deleted this event.';
                    $rootScope.$broadcast('got/archivedEvents');
                });

        }, function () {
            $scope.status = 'You did not delete this event.';
        });
    };
}]);