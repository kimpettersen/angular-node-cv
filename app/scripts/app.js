'use strict';

var CVApp = angular.module('CVApp', ['adminServices',
                                      'mainServices',
                                      'loginServices',
                                      'CVServicesMock',
                                      'ngSanitize',
                                      'controllers'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/documentation', {
        templateUrl: 'views/documentation.html',
        controller: 'DocCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    }]).run( function($rootScope, $location) {
      $rootScope.$on( '$routeChangeStart', function(event, next, current) {
        var loggedIn = localStorage.getItem('loggedIn') === 'true' ? true : false;

        if (next.templateUrl === 'views/admin.html'){
          if ( loggedIn !== true ) {
            if ( next.templateUrl === 'views/login.html' ) {
            } else {
              $location.path( "/login" );
            }
          }
        }
      });
    });

var Controllers = angular.module('controllers', []);
