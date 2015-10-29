app.factory('$studentsFilter', ['$resource', function($resource){
    return {
        students: $resource('api/student/:query')
    }
}]);