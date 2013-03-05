angular.module("adminServices",["ngResource"]).factory("adminService",function(a){var b={};return b.resource={},b.tags=[],b.bucketlist={},b.education={},b.experience={},b.me={},b.user={},b.bucketlist.resource=a("/api/bucketlist/:id",{id:"@_id"},{edit:{method:"PUT"}}),b.education.resource=a("/api/education/:id",{id:"@_id"},{edit:{method:"PUT"}}),b.experience.resource=a("/api/experience/:id",{id:"@_id"},{edit:{method:"PUT"}}),b.me.resource=a("/api/me/:id",{id:"@_id"},{edit:{method:"PUT"}}),b.user.resource=a("/api/user/:id",{id:"@_id"},{edit:{method:"PUT"}}),b.updateResources=function(a){b[a].resource.query(function(c){b[a].resources=c})},b.findById=function(a){var c=b[a.type].resources;if(c===undefined)return;for(var d=0;d<c.length;d++)if(c[d]._id===a.id)return c[d]},b.createResource=function(a,c){if(a.item===undefined||a.type===undefined)return c("You need to specify an item and type {item: {}, type: String}");var d=angular.copy(a.item);b[a.type].resource.save(d,function(){return b.updateResources(a.type),c("Succesfully created a new "+a.type)},function(a){return c("Server returned status code: "+a.status+"\n"+a.data.error)})},b.editResource=function(a,c){if(a.item===undefined||a.type===undefined)return c("You need to specify an item and type {item: {}, type: String}");var d=angular.copy(a.item);if(!d.hasOwnProperty("_id"))return c("Can not modify non existing item");b[a.type].resource.edit(d,function(){return b.updateResources(a.type),c("Succesfully edited "+a.type)})},b.editItem=function(a){b[a.type].item=b.findById(a)},b.delItem=function(a,c){if(a.id===undefined||a.type===undefined)return c("You need to specify an item and type {item: {}, type: String}");b[a.type].resource.remove({id:a.id},function(){return b.updateResources(a.type),c("Succesfully deleted item")})},b}).directive("resources",function(){return{scope:{list:"=",display:"@",edit:"&",del:"&",show:"&",type:"@"},template:'<div ng-repeat="elem in list">Name: {{ elem[display] }} <button class="btn show-item-button" ng-click="edit({ item: {id: elem._id, type: type } })">Show</button>  <button class="btn delete-item-button" ng-click="del({ item: {id: elem._id, type: type } })">Delete</button> </div>'}}),angular.module("mainServices",["ngResource"]).factory("mainService",function(a){var b={};return b.bucketlist={},b.education={},b.experience={},b.me={},b.user={},b.bucketlist.resource=a("/api/bucketlist/:id"),b.education.resource=a("/api/education/:id"),b.experience.resource=a("/api/experience/:id"),b.me.resource=a("/api/me/:id"),b.user.resource=a("/api/user/:id"),b.get=function(a){return b[a.type].resource.query()},b}),angular.module("loginServices",[]).factory("loginService",function(a){var b={},c=function(){a.get("/auth/userstatus").success(function(a,b){b===200?localStorage.setItem("loggedIn",!0):localStorage.setItem("loggedIn",!1)}).error(function(){localStorage.setItem("loggedIn",!1)})};return b.updateStatus=c,b}),"use strict";var CVApp=angular.module("CVApp",["adminServices","mainServices","loginServices","controllers"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/documentation",{templateUrl:"views/documentation.html",controller:"DocCtrl"}).when("/admin",{templateUrl:"views/admin.html"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/"})}]).run(function(a,b){a.$on("$routeChangeStart",function(a,c,d){var e=localStorage.getItem("loggedIn")==="true"?!0:!1;c.templateUrl==="views/admin.html"&&e!==!0&&c.templateUrl!=="views/login.html"&&b.path("/login")})}),Controllers=angular.module("controllers",[]);"use strict",Controllers.controller("MainCtrl",["$scope","MainCtrl",function(a,b){a.about=mainService.get({type:"me"}),a.education=mainService.get({type:"education"}),a.experience=mainService.get({type:"experience"}),a.bucketlist=mainService.get({type:"bucketlist"})}]),"use strict",Controllers.controller("DocCtrl",["$scope",function(a){}]),"use strict",Controllers.controller("MenuCtrl",["$scope","$rootScope","$location","$http","loginService",function(a,b,c,d,e){a.loginService=e,a.loginService.updateStatus(),a.isLoggedIn=function(){var a=localStorage.getItem("loggedIn")==="true"?!0:!1;return a},a.changeView=function(a){c.path(a)},a.logout=function(){localStorage.setItem("loggedIn",!1),d.get("/auth/logout").success(function(b){a.loginService.updateStatus()})}}]),"use strict",Controllers.controller("BucketlistCtrl",["$scope","adminService",function(a,b){a.adminService=b,a.ratings=[1,2,3,4,5],a.currentItem={},a.status="",a.mode="create",a.adminService.updateResources("bucketlist"),a.show=function(c){a.currentItem=b.findById(c)},a.edit=function(c){a.mode="edit",a.currentItem=b.findById(c),b.editItem(c)},a.del=function(c){b.delItem(c,function(b){a.status=b})},a.resetCurrent=function(){a.currentItem={},a.mode="create",b.bucketlist.item={}},a.editResource=function(c){b.editResource(c,function(b){a.status=b})},a.createResource=function(c){b.createResource(c,function(b){a.status=b})},a.isCreateMode=function(){return a.mode==="create"}}]),"use strict",Controllers.controller("EducationCtrl",["$scope","adminService",function(a,b){a.adminService=b,a.adminService.updateResources("education"),a.currentItem={},a.currentItem.tags=[],a.status="",a.mode="create",a.addTag=function(b){a.currentItem.tags.push(b)},a.removeTag=function(b){for(var c=0;c<a.currentItem.tags.length;c++)a.currentItem.tags[c]===b&&a.currentItem.tags.splice(c,1)},a.editResource=function(c){a.currentItem=b.findById({type:"education",id:c.item._id}),b.editResource(c,function(b){a.status=b})},a.createResource=function(c){c.item.tags=a.currentItem.tags,b.createResource(c,function(b){a.status=b})},a.edit=function(c){a.mode="edit",a.currentItem=b.findById(c),b.editItem(c)},a.del=function(c){b.delItem(c,function(b){a.status=b})},a.resetCurrent=function(){a.currentItem={},a.currentItem.tags=[],a.mode="create",b.education.item={}},a.isCreateMode=function(){return a.mode==="create"}}]),"use strict",Controllers.controller("ExperienceCtrl",["$scope","adminService",function(a,b){a.adminService=b,a.adminService.updateResources("experience"),a.currentItem={},a.currentItem.tags=[],a.status="",a.mode="create",a.addTag=function(b){a.currentItem.tags||(a.currentItem.tags=[]),a.currentItem.tags.push(b)},a.removeTag=function(b){for(var c=0;c<a.currentItem.tags.length;c++)a.currentItem.tags[c]===b&&a.currentItem.tags.splice(c,1)},a.editResource=function(c){a.currentItem=b.findById({type:"experience",id:c.item._id}),b.editResource(c,function(b){a.status=b})},a.createResource=function(c){c.item.tags=a.currentItem.tags,b.createResource(c,function(b){a.status=b})},a.edit=function(c){a.mode="edit",a.currentItem=b.findById(c),b.editItem(c)},a.del=function(c){b.delItem(c,function(b){a.status=b})},a.resetCurrent=function(){a.currentItem={},a.currentItem.tags=[],a.mode="create",b.experience.item={}},a.isCreateMode=function(){return a.mode==="create"}}]),"use strict",Controllers.controller("MeCtrl",["$scope","adminService",function(a,b){a.adminService=b,a.adminService.updateResources("me"),a.currentItem={},a.currentItem.tags=[],a.status="",a.mode="create",a.addTag=function(b){a.currentItem.tags||(a.currentItem.tags=[]),a.currentItem.tags.push(b)},a.removeTag=function(b){for(var c=0;c<a.currentItem.tags.length;c++)a.currentItem.tags[c]===b&&a.currentItem.tags.splice(c,1)},a.editResource=function(c){a.currentItem=b.findById({type:"me",id:c.item._id}),b.editResource(c,function(b){a.status=b})},a.createResource=function(c){c.item.tags=a.currentItem.tags,b.createResource(c,function(b){a.status=b})},a.edit=function(c){a.tags=[],a.currentItem=b.findById(c),b.editItem(c),a.mode="edit"},a.del=function(c){b.delItem(c,function(b){a.status=b})},a.resetCurrent=function(){a.currentItem={},a.currentItem.tags=[],a.mode="create",b.me.item={}},a.isCreateMode=function(){return a.mode==="create"}}]),"use strict",Controllers.controller("UserCtrl",["$scope","adminService",function(a,b){a.adminService=b,a.adminService.updateResources("user"),a.currentItem={},a.status="",a.mode="create",a.show=function(c){a.currentItem=b.findById(c)},a.edit=function(c){a.mode="edit",a.currentItem=b.findById(c),b.editItem(c)},a.del=function(c){b.delItem(c,function(b){a.status=b})},a.resetCurrent=function(){a.currentItem={},a.mode="create",b.user.item={}},a.editResource=function(c){b.editResource(c,function(b){a.status=b})},a.createResource=function(c){b.createResource(c,function(b){a.status=b})},a.isCreateMode=function(){return a.mode==="create"},a.$watch("currentItem",function(){Object.keys(a.currentItem).length===0?a.mode="create":a.mode="edit"},!0)}]),"use strict",Controllers.controller("LoginCtrl",["$scope","$http","loginService",function(a,b,c){a.status="",a.login=function(d){var e=d||{};e.username&&e.password?b.post("/auth/login",e).success(function(b,d,e,f){d===200?(a.status=b,localStorage.setItem("loggedIn",!0)):(localStorage.setItem("loggedIn",!1),a.status="Wrong username or password"),c.updateStatus()}).error(function(b){localStorage.setItem("loggedIn",!1),a.status="Wrong username or password"}):a.status="Fields can not be blank"}}]);