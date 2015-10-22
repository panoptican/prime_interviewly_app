
/*
 View events controller
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