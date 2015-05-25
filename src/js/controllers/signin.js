'use strict';
/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state',
  function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {

      // Try to login
      $scope.authError = null;
      var url = app.urlRoot + 'user/login.iv?number='+ $scope.user.email +'&password='+ $scope.user.password +'&jsonp=JSON_CALLBACK';
      /*var url = 'api/login';
      $http.post(url, {
        email: $scope.user.email,
        password: $scope.user.password
      })*/
      $http.jsonp(url).then(function(response) {
        //debugger;
        //console.log(response);
        if (response.data.code === '1' && response.data.msg === 'success') {
          $state.go('app.home');
        } else {
          $scope.authError = 'Name or Password not right';
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }
]);