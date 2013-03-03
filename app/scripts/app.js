'use strict';

var CVApp = angular.module('CVApp', ['adminServices',
                                      'mainServices',
                                      'loginServices',
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

// Mock http requests
var CVAppDev = angular.module('myAppDev', ['CVApp', 'ngMockE2E']);

CVAppDev.run(function($httpBackend) {
  var bucketlist,
      education,
      experience,
      me,
      user;

bucketlist = {
      _id: '1'
            title: 'bucket title',
            description: 'bucket description',
            rating: 1
          };

education = {
      _id: '2'
            institution: 'edu institution',
            degree: 'edu degree',
            description: 'edu description',
            tags: ['edu tag1', 'edu tag2']
          };

experience = {
      _id: '3'
            company: 'exp company',
            description: 'exp description',
            startDate: 'exp startDate',
            endDate: 'exp endDate',
            tags: ['exp tag1', 'exp tag2']
          };

me = {
      _id: '4'
      title:'me title',
      description:'me description',
      tags: ['me tag1', 'me tag2']
    };

user = {
      _id: '5'
      username: 'admin',
      password: '1234'
    };

  $httpBackend.whenGET('/bucketlist').respond(bucketlist);
  $httpBackend.whenGET('/education').respond(education);
  $httpBackend.whenGET('/experience').respond(experience);
  $httpBackend.whenGET('/me').respond(me);
  $httpBackend.whenGET('/user').respond(user);

  $httpBackend.whenPOST('/bucketlist').respond(bucketlist);
  $httpBackend.whenPOST('/education').respond(education);
  $httpBackend.whenPOST('/experience').respond(experience);
  $httpBackend.whenPOST('/me').respond(me);
  $httpBackend.whenPOST('/user').respond(user);

  $httpBackend.whenPUT('/bucketlist').respond(bucketlist);
  $httpBackend.whenPUT('/education').respond(education);
  $httpBackend.whenPUT('/experience').respond(experience);
  $httpBackend.whenPUT('/me').respond(me);
  $httpBackend.whenPUT('/user').respond(user);

  $httpBackend.whenDelete('/bucketlist').respond(bucketlist);
  $httpBackend.whenDelete('/education').respond(education);
  $httpBackend.whenDelete('/experience').respond(experience);
  $httpBackend.whenDelete('/me').respond(me);
  $httpBackend.whenDelete('/user').respond(user);

  // adds a new phone to the phones array
  $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
    phones.push(angular.fromJSON(data));
  });
  $httpBackend.whenGET(/^\/templates\//).passThrough();
  //...
});
