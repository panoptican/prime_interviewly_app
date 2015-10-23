
/*
 Events list controller
  */
app.controller('eventsCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $http.get('/api/event').then(function success(response) {

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

}]);


app.controller('modalCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog) {
    $scope.alert = '';

    $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('You are about to Archive this Event!')
            .content('Click to confirm. You can access this Event at any time in Archived Events.')
            .ariaLabel('Archive')
            .targetEvent(ev)
            .ok('Got it!')
            .cancel('Nevermind.');

        $mdDialog.show(confirm).then(function () {
            $scope.status = 'You archived this event.';
        }, function () {
            $scope.status = 'You did not archive this event.';
        });
    };

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this Event?')
            .content('This will permanently delete this Event.')
            .ariaLabel('Delete')
            .targetEvent(ev)
            .ok('Yes, delete this Event!')
            .cancel('No way, that was close!');

        $mdDialog.show(confirm).then(function () {
            $scope.status = 'You deleted this event.';
        }, function () {
            $scope.status = 'You did not delete this event.';
        });
    };
}]);