angular.module('adminServices', ['ngResource'])
  .factory('adminService', function($resource){
    var service = {}; //Service namespace
    service.resources = []; //List of all resources
    service.resource = {}; //The current resource
    service.tags = [];
    service.bucketlist= {};
    service.education= {};
    service.experience= {};
    service.me= {};
    service.user= {};



    service.bucketlist.resource = $resource('/api/bucketlist/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.education.resource = $resource('/api/education/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.experience.resource = $resource('/api/experience/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.me.resource = $resource('/api/me/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.user.resource = $resource('/api/user/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.updateResources = function(type){
      service[type].resource.query(function(res){
        service[type].resources = res;
      });

    };

    service.findById = function(options){
      // Takes option object with id and type
      // e.g { id: '123', type: 'education'}

      var items = service[options.type].resources;
      for (var i = 0; i < items.length; i++){
        if (items[i]._id === options.id){
          return items[i];
        }
      }
    };

    service.createResource = function (options){
      service[options.type].resource.save(angular.copy(options.item), function(){
        service.updateResources(options.type);
      });
    };

    service.editResource = function (options){
      var item = angular.copy(options.item);

      if (!item.hasOwnProperty('_id')){
        alert('Can not modify non existing item');
      }
      service[options.type].resource.edit(item, function(){
        service.updateResources(options.type);
      });
    };

    service.editItem = function(options){
      service[options.type].item = service.findById(options);
    };

    service.delItem = function(options){
      console.log(options);
      service[options.type].resource.remove({ id: options.id }, function(){
        service.updateResources(options.type);
      });
    };

    service.addTag = function(tag){
      service.tags.push(tag);
    };

    return service;
    })
  .directive('resources', function (){
    return {
      scope: {
        list: '=',
        display: '@',
        edit: '&',
        del: '&',
        type: '@'
      },
      template: '<div ng-repeat="elem in list">Name: {{ elem[display] }}' +
                ' <button ng-click="edit({ item: {id: elem._id, type: type } })">Edit</button> ' +
                ' <button ng-click="del({ item: {id: elem._id, type: type } })">Delete</button> ' +
                '</div>'
    };
  });

