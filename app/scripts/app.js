'use strict';

var CVApp = angular.module('CVApp', ['adminServices',
                                      'mainServices',
                                      'loginStatus',
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
    }]).run( function($rootScope, $location, loginStatus) {
      $rootScope.loginStatus = loginStatus;

      $rootScope.$on( '$routeChangeStart', function(event, next, current) {
        if (next.templateUrl === 'views/admin.html'){

          if ( $rootScope.loginStatus.loggedIn !== true ) {
            if ( next.templateUrl === 'views/login.html' ) {
            } else {
              $location.path( "/login" );
            }
          }
        }
      });

    });



var Controllers = angular.module('controllers', []);


    // .run() {
    // // register listener to watch route changes
    // $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    //   if ( $rootScope.loggedUser == null ) {
    //     // no logged user, we should be going to #login
    //     if ( next.$route.templateUrl == "partials/login.html" ) {
    //       // already going to #login, no redirect needed
    //     } else {
    //       // not going to #login, we should redirect now
    //       $location.path( "/login" );
    //     }
    //   }
    // });

