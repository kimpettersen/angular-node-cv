angular.module('adminServices', ['ngResource'])
  .factory('adminService', function($resource){
    var service = {}; //Service namespace
    service.resources = []; //List of all resources
    service.resource = {}; //The current resource

    service.bucketlist = $resource('/api/bucketlist/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.education = $resource('/api/education/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.experience = $resource('/api/experience/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.me = $resource('/api/me/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.user = $resource('/api/user/:id',
      {'id': '@_id'}, {edit: { method: 'PUT' }}
    );

    service.updateResources = function(type){
      console.log('Updating resources');
      service[type].query(function(res){
        service.resources = res;
      });

    };

    service.findById = function(id){
      for (var i = 0; i < service.resources.length; i++){
        if (service.resources[i]._id === id){
          return service.resources[i];
        }
      }
    };

    service.createResource = function (options){
      service[options.type].save(angular.copy(options.item), function(){
        service.updateResources(options.type);
      });
    };

    service.editResource = function (options){
      var item = angular.copy(options.item);

      if (!item.hasOwnProperty('_id')){
        alert('Can not modify non existing item');
      }
      service[options.type].edit(item, function(){
        service.updateResources(options.type);
      });
    };

    service.editItem = function(id){
      console.log('edit item with id: ', id);
      service.resource = service.findById(id);
    };

    service.delItem = function(options){
      console.log(options);
      service[options.type].remove({ id: options.id }, function(){
        service.updateResources(options.type);
      });
    };

    return service;
    });
