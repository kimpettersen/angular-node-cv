// describe('Admin page user items', function(){

//   describe('Button behaviour', function(){
//     it('should have create enabled and edit/clear disabled as default', function(){
//       expect(element('#user .create-button').prop('disabled')).toBeFalsy();
//       expect(element('#user .clear-button').prop('disabled')).toBeTruthy();
//       expect(element('#user .edit-button').prop('disabled')).toBeTruthy();
//       expect(element('#user .mode-field').html()).toContain('CREATE MODE');
//     });

//     it('should have edit/clear enabled and create disabled when editing', function(){
//       element('#user .show-item-button').click();
//       expect(element('#user .mode-field').html()).toContain('EDIT MODE');

//       expect(element('#user .create-button').prop('disabled')).toBeTruthy();
//       expect(element('#user .clear-button').prop('disabled')).toBeFalsy();
//       expect(element('#user .edit-button').prop('disabled')).toBeFalsy();
//     });

//     it('should remove current item when pressing clear', function(){
//       element('#user .show-item-button').click();
//       expect(element('#user .mode-field').html()).toContain('EDIT MODE');

//       expect(element('#user .create-button').prop('disabled')).toBeTruthy();
//       expect(element('#user .clear-button').prop('disabled')).toBeFalsy();
//       expect(element('#user .edit-button').prop('disabled')).toBeFalsy();

//       element('#user .clear-button').click();

//       expect(element('#user .mode-field').html()).toContain('CREATE MODE');

//       expect(element('#user .create-button').prop('disabled')).toBeFalsy();
//       expect(element('#user .clear-button').prop('disabled')).toBeTruthy();
//       expect(element('#user .edit-button').prop('disabled')).toBeTruthy();

//     });
//   });

//   describe('Testing user admin', function(){
//     it('should delete an item if delete is clicked', function(){
//       element('#user .delete-item-button').click();
//       expect(element('#user .resource-list > div').count()).toBe(0);
//     });

//     it('should create an item when clicking create', function(){
//       input('adminService.user.item.username').enter('admin');
//       input('adminService.user.item.password').enter('1234');
//       element('#user .create-button').click();
//       expect(element('#user .edit-status').html()).toContain(' Succesfully created a new user');

//       element('#user .show-item-button').click();

//       expect(element('#user-pre').html()).toContain('"title": "admin"');
//       expect(element('#user-pre').html()).toContain('"description": "1234"');
//     });

//     it('should have elements in resource list', function(){
//       expect(element('#user .resource-list > div').count()).toBeGreaterThan(0);
//     });

//     it('Should display the element when clicking show', function(){
//       element('#user .show-item-button').click();
//       expect(element('#user-pre').html()).toContain('"title": "admin"');
//       expect(element('#user-pre').html()).toContain('"description": "1234"');
//     });

//     it('should edit the item when pressing save', function(){
//       element('#user .show-item-button').click();
//       input('adminService.user.item.username').enter('user2');
//       input('adminService.user.item.password').enter('pass2');

//       element('#user .edit-button').click();
//       expect(element('#bucketlist .edit-status').html()).toContain('Succesfully edited user');

//       expect(element('#user-pre').html()).toContain('"title": "user2"');
//       expect(element('#user-pre').html()).toContain('"description": "pass2"');
//     });

//   });
// });
