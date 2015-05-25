'use strict';
/* Controllers */
angular.module('app').controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$http',
  function($scope, $translate, $localStorage, $window, $http) {
    // add 'ie' classes to html
    var isIE = !! navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');
    isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
    // config
    $scope.app = {
      name: '微讯平台',
      version: '1.0.0',
      // for chart colors
      color: {
        primary: '#7266ba',
        info: '#23b7e5',
        success: '#27c24c',
        warning: '#fad733',
        danger: '#f05050',
        light: '#e8eff0',
        dark: '#3a3f51',
        black: '#1c2b36'
      },
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-black',
        navbarCollapseColor: 'bg-white-only',
        asideColor: 'bg-black',
        headerFixed: true,
        asideFixed: false,
        asideFolded: false,
        asideDock: false,
        container: false
      }
    }
    // save settings to local storage
    if (angular.isDefined($localStorage.settings)) {
      $scope.app.settings = $localStorage.settings;
    } else {
      $localStorage.settings = $scope.app.settings;
    }
    $scope.$watch('app.settings', function() {
      if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
        // aside dock and fixed must set the header fixed.
        $scope.app.settings.headerFixed = true;
      }
      // save to local storage
      $localStorage.settings = $scope.app.settings;
    }, true);
    // angular translate
    $scope.lang = {
      isopen: false
    };
    $scope.langs = {
      en: 'English',
      de_DE: 'German',
      it_IT: 'Italian',
      zh_CN: '中文（简体）'
    };
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
    $scope.setLang = function(langKey, $event) {
      // set the current lang
      $scope.selectLang = $scope.langs[langKey];
      // You can change the language during runtime
      $translate.use(langKey);
      $scope.lang.isopen = !$scope.lang.isopen;
    };

    $scope.app.ui = {};
    var uiInit = $scope.app.ui.init = function() {
      $http.post('api/nav_items.js').then(function(resp) {
        //debugger;
        if (resp.data.datalist) {
          $scope.app.ui.items = resp.data.datalist;
          var dt = resp.data.datalist,
            len = dt.length;
          for (var i = 0; i < len; i++) {
            //console.log($scope.lists.name);
          }
        };
      });
    };

    uiInit();

    function isSmartDevice($window) {
      // Adapted from http://www.detectmobilebrowsers.com
      var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
      // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }
  }
]);