// describe('Testing routes', function() {


//   beforeEach(function() {
//     browser().navigateTo('/');
//     browser().navigateTo('/login');
//     // input('user.username').enter('admin');
//     // input('user.password').enter('1234');
//     // element('#login-button').click();
//     // expect(element('#status').text()).toContain('Succesful login');
//   });

//   describe('Displaying login functionality', function(){
//     it('should display login button when not logged in', function(){
//       element('#logout-nav-button').click();
//       expect(element('.login-button:visible').count()).toBe(1);
//       expect(element('.logout-button:visible').count()).toBe(0);
//     });

//     it('should not display logout button when not logged in', function(){
//       browser().navigateTo('/login');
//       input('user.username').enter('admin');
//       input('user.password').enter('1234');
//       element('#login-nav-button').click();
//       expect(element('#status').text()).toContain('Succesful login');
//       expect(element('.login-button:visible').count()).toBe(0);
//       expect(element('.logout-button:visible').count()).toBe(1);
//     });

//   });

// });
