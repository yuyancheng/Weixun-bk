app.controller('navCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.post('api/org.js').then(function(resp) {
      //debugger;
      if (resp.data.datalist) {
        var dt = resp.data.datalist,
          len = dt.length;
        for (var i = 0; i < len; i++) {
          $scope.lists = dt[i];
          //console.log($scope.lists.name);
        }
      };
    });
  }
])