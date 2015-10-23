app.controller('interviewers', ['$scope', '$http', function($scope, $http){
  $http.get('/api/interviewer').then(function(response){
   console.log(response);
   $scope.interviewers = response.data
  })
}]);