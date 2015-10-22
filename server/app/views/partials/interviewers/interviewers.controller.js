app.controller('interviewers', ['$scope', '$http', function($scope, $http){
 $scope.submit = function(){
  $http.get('/api/interviewer').then(function(response){
   console.log(response);
  })
 }
}]);