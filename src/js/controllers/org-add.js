app.controller('OrgAdd', ['$scope', '$http', '$state',
  function($scope, $http, $state) {
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
    $scope.msg = "A test of param.";
    $scope.formDat = {};
    $scope.submit = function() {
      jQuery.ajax({
        url: app.urlRoot + 'adminOrgUnit/allAdminOrgUnits.iv',
        data: $.param($scope.formData),
        dataType: "json",
        type: 'post',
        //jsonp: 'callback',
        //jsonpCallback: 'jsonpCallback',
        success: function(dt) {
          console.log(dt);
        }
      });
/*      $http({
        url: app.urlRoot + 'adminOrgUnit/allAdminOrgUnits.iv',
        data: $.param($scope.formData),
        method: 'post'
      }).success(function(resp) {
        console.log(resp.data);
      });*/
    };
  }
])