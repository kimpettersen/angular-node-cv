angular.module('loginServices', [])
.factory('loginService', function($http){
      var service = {};

      var updateStatus = function(){

        //Test protected resource to see if user is logged in
        $http.get('/auth/userstatus').success(function(res, status){
          if (status === 200){
            //User is logged in
            localStorage.setItem('loggedIn', true);
          }else{
            //Just an error
            localStorage.setItem('loggedIn', false);
          }
        })
        .error(function(){
          //User is not logged in
          localStorage.setItem('loggedIn', false);
        });
      };
      service.updateStatus = updateStatus;
      return service;
    });
