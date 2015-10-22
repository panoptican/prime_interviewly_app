
/*
 View events controller
 */
app.controller('viewEventCtrl', ['$scope', '$http', '$filter', '$routeParams', function($scope, $http, $filter, $routeParams) {

    var eventParam = $routeParams._id;

    $http.get('/api/event?_id=' + eventParam).then(function success(response) {

        $scope.eventTitle = response.data[0].cohort + ' ' + response.data[0].type

    }, function error() {});

}]);