app.controller('interviewers', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
  $http.get('/api/interviewer').then(function(response){
   console.log(response);
   $scope.interviewers = response.data
  });

 $rootScope.$on('got/interviewers', function(){
  $http.get('/api/interviewer').then(function(response){
   console.log(response);
   $scope.interviewers = response.data
  });
 });

 $scope.editInterviewer = function(id) {
  $http.get('/api/interviewer?_id=' + id).then(function (response) {
   $scope.interviewer = response.data[0];
   $mdDialog.show({
    controller: 'editInterviewer',
    locals: {
     items: $scope.interviewer
    },
    templateUrl: 'views/partials/dialogs/interviewer/interviewerEdit.html',
    parent: angular.element(document.body),
    clickOutsideToClose: true
   })
  })
 };
 $scope.archive = function(id){
  $http.post('api/interviewer/archive?_id='+id, {isArchived: true}).then(function(response){
   $rootScope.$broadcast('got/interviewers');
  })
 };
}]);

app.controller('gotInterviewers', ['$scope', '$mdDialog', 'items', function($scope, $mdDialog, items){
 $scope.interviewer = items;
 console.log(items);

 $scope.close = function(){
  $mdDialog.hide();
 }
}]);