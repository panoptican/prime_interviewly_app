app.controller('interviewers', ['$scope', '$http', function($scope, $http){
  $http.get('/api/interviewer').then(function(response){
   console.log(response);
   $scope.interviewers = response.data
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
 }
}]);

app.controller('editInterviewer', ['$scope', '$mdDialog', 'items', function($scope, $mdDialog, items){
 $scope.interviewer = items;
 console.log(items);

 $scope.close = function(){
  $mdDialog.hide();
 }
}]);