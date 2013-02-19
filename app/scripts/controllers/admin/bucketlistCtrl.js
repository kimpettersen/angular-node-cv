
'use strict';

CVApp.controller('BucketlistCtrl', function( $scope, adminService ) {
  $scope.adminService = adminService;
  $scope.ratings = [1, 2, 3 ,4 ,5];
  $scope.adminService.updateResources('bucketlist');
  $scope.currentItem = {};
  $scope.status = '';
  var editorOpts = {
    container: 'bucketlist-editor',
    basePath: '/scripts/vendor/epiceditor-0.2.0/',
    clientSideStorage: true,
    localStorageName: 'bucketlist-editor',
    useNativeFullsreen: true,
    parser: marked,
    file: {
      name: 'bucketlist-editor',
      defaultContent: '',
      autoSave: 100
    },
    theme: {
      base:'themes/base/epiceditor.css',
      preview:'themes/preview/preview-dark.css',
      editor:'themes/editor/epic-dark.css'
    },
    focusOnLoad: false,
    shortcut: {
      modifier: 18,
      fullscreen: 70,
      preview: 80
    }
  }

  var ed = new EpicEditor(editorOpts).load();


  $scope.show = function(item){
    $scope.currentItem = adminService.findById(item);
  };

  $scope.edit = function(item){
    $scope.currentItem = adminService.findById(item);
    adminService.editItem(item);
  };

  $scope.editResource = function(options){
    adminService.editResource(options, function(res){
      $scope.status = res;
    });
  };

  // Wrapper to attach tags to the item
  $scope.createResource = function(options){
    adminService.createResource(options, function(res){
      $scope.status = res;
    });
  };

});
