'use strict';

var CVApp = angular.module('CVApp', ['adminServices', 'mainServices', 'controllers'])
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
      .otherwise({
        redirectTo: '/'
      })
    }]);

var Controllers = angular.module('controllers', []);


    // .run(function($rootScope, $location) {
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

