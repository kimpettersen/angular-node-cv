Angular-node-cv
===============

Angular-node-cv is what it sounds like: my CV written in AngularJS. The backend is an (almost)RESTful API written in NodeJS and Express.
If you want you can clone this repository and download it, simply follow the instructions below.

The project is hosted at [kimpettersen.org](http://angularcv.jit.su)

If you have any questions or just want to say hello, talk to me on [Twitter](https://twitter.com/PettersenKim)

This is the documentation and my genreal thoughts about the result and process of this project. I will write a part 2
of this explaining my biggest obsticles in the process.

Why did I do this?
===================

There were many reasons. I was not satisfied with my testing skills, I wanted to implement a REST api, and I wanted to learn Angular JS.
I am also looking for a new [job](http://kimpettersen.org).


What can you do with it?
========================

####Without installing anything you can:####


* Give me a job offer!
* Perform a GET request to the API (There's list of things I want to do in the API)
* Look through the code
* Give me a code review or any type of feedback


####If you chose to install it you can also:####

* Run the system on localhost
* Run tests
* Create, read, update and delete different items through the admin page and the API



Requirements
============

* [Mongodb](http://www.mongodb.org/) running locally
* [Node JS](http://nodejs.org/) 0.8.x


Tests
=====

Since this is an experimental project I decided to follow a few different approaches. I use Mocha to run tests
on the server, and Jasmine and Testacular for the tests front-end. The e2e tests depends on the database content, the reason
why is discussed further down.


##Important!##

Once you start the server with NODE_ENV set to test, it generates test data that the tests depend on.
You should therefore restart the node server when you switch between test types. Unittests are not affected by this,
but a failed e2e test can mess up the order.

##Run the tests##
*Start the server:* NODE_ENV=test node server/index.js

*server unittests*: sh server_test.sh

*server e2e tests*: sh server_e2e.sh

*Restart server*

*Angular unittests*: sh test.sh

*server unittests*: sh e2e_test.sh

API Documentation
=================

All users can perform GET requests to all resources except getting a user. All other resources require authentication.

The base URL for the resources is: http://kimpettersen.org/api/

The available resources are:

* education - an education item
* experience - an experience item
* me - an item that contains information about me
* user - the authenticated users
* bucketlist - a little extra detail for the ones reading this

####Examples:####

To get all education resources: GET http://kimpettersen.org/api/education

To get one specific resource: GET http://kimpettersen.org/api/education/<id>

To create a new resource: POST http://kimpettersen.org/api/education/

To edit a resource: PUT http://kimpettersen.org/api/education/<id>

To delete a resource: DELETE http://kimpettersen.org/api/education/<id>


*NOTE:* Bucketlist is a list of things I want to learn. To access this list you would have to perform a GET request to:

http://kimpettersen.org/api/bucketlist


<del>You can also perform a POST request with a job offer to: http://kimpettersen.org/api/offer</del> -
This was meant to be an experimental feature, but it is just too risky.


##Resource details##


####Education####

* institution: String
* degree: String
* description: String
* tags: [String],
* _id: Number,
* isDeletes: boolean


####Experience####

* company: String
* description: String
* duration: String
* tags: [String],
* _id: Number,
* isDeletes: boolean


####Me####

* title: String,
* description: String
* tags: [String],
* _id: Number,
* isDeletes: boolean


####User####

* username: String
* password: String,
* _id: Number,
* isDeletes: boolean


####Bucketlist####

* title: String
* description: String
* rating: Number,
* _id: Number,
* isDeletes: boolean


The json object to pass to the server should look something like this:

    {
      title: 'My title',
      description: 'My description',
      tags: ['one tag', 'another tag']
    }


About the process and the result.
===================================

##Did I reach my goals for this project?##

Yes, I most certainly did. I feel like I am in a position where I can say that I know the pitfalls of testing,
I am confident working with Node JS, and Angular JS. The project definitely changed the way I write code for the better, and I can now make decissions that will lead to more testable code.

Overall, I am very satisfied with the result. This has been a very educational process.

##Would I have done anything differently?##

Yes, for sure. The project simply took too much of my time, so there are some parts I would have done differently.


Code reuse was something I took very seriously, but I still decided to add five different resources.
This was sort of to make sure I could create a base controller and base models, so it would be less test duplication.
However all of these resources did basically the same thing. It stored text and tags. This led to a lot of time being wasted on
copying and pasting tests and code five different places.

This would have made sense if it was only an API: Since this is so tightly coupled to the front-end, and the
difference between the resources are minimal, it would have been a lot smarter to do this dynamically.

With a dynamic way of creating your own resources out of a combination of input and text areas, I would have had a
basic CMS. This is something I think the Javascript community needs, and something I intend to turn this project into.


The API is not completly RESTful. For starters, I have completly ignored versioning and the server also handles the authentication sessions. 
I do, however, feel satisfied with what I've learned.


My experience testing
=====================

I tried a few different approaches to testing in this project. I will write a longer post about this soon, but this is a short summary of my experience.

My assumptions about testing:

* It helps you detect errors you create by fixing other other bugs.
* It wil generally increase code quality.


These assumptions were true, but testing do so much more. This was the biggest surprise I encountered during this period.

* It does help you detect errors you create while fixing something else, but that is
not the biggest advantage.

* It forces you to put code where it belongs.
* You think about dependencies and how complicated you can make any logic less complicated.
* All of this plays imprtant parts towards more reusable and cleaner code that is a lot easier to maintain and extend.


##Exmple##

One thing I noticed during this project, was a very basic thing *that barely anyone talks about*.
A lot of MV* frameworks out there follows same pattern. Whenever you do a tutorial or read a book, it tells you
how to handle a request, fetch some data from a model, somehow manipulate it in the controller, and return the response.


This approach makes it almost impossible to reuse any manipulation or logic you perform on the data from the model.
Imagine having ten different controllers that are making more or less the same query on the model, this is ten
implementations of the same thing. 

This is untestable code. You need to Mock the request object, you have to get the response object somehow, 
and you need to Mock the model, which probably has its own dependencies, and so it goes. Following this pattern is why it took me a bit of time to understand how to test.


###A solution###
*Put your logic in the model*. It is as simple as that. This way you realize right away that you are putting a function in the
wrong place. This makes the model testable, since it can be treated as a separate module and will definitely have less
dependencies than if it was inside the controller.
Now that the function belongs to a model, you can easily reuse it in all your controllers.


Here I have to check input, prepare arguments and all of that in *every single controller* this is very difficult to test.

      app.get('/api/bucketlist/:id', function(request, response) {
          var id = request.body.id
          if (id === undefined) {
            response.status(204);
            //handle the result
          }
          
          args = {};
          args.isDeleted = { '$ne': true };
          args.id = { id: id}
          model.find(args, function(err, res){
            response.status(200);
            //prepare response
            response.send();
          });    
      });


Instead I put the logic in my model: 

    BaseSchema.statics.get = function(args, callback){
      args = Object.prototype.toString.call(args) === '[object Object]' ? args : {};
      args.isDeleted = { '$ne': true };
      this.find(args, function(err, res){
        callback(err, res);
      });
    };

This is easy to test.

And in the controllers I do this:

      app.get('/api/education/?', function(request, response) {
        model.Education.get({}, function(error, result){
         //base controller that sets right status code, and handles errors
         controller.resultHandler(error, result, response, 200, function(data){
             response.json(data);
         });
        });
      });

Now I can just test my response codes with an e2e test.


This is not very difficult, nor is it a new approach. It just seems to be a forgotten by a lot of developers.

*NOTE* This theory isn't as true for Angular JS, since Angular uses Dependency Injection it is actually pretty easy to
test controllers. That does not mean that you should take advantage of it.


About the technologies I've used.
================================

This is all based on my personal experience with developing the project and deploying it on
[Nodejitsu](https://www.nodejitsu.com/)


##Angular JS##

[Angular](http://angularjs.org) is an amazing framework! What I like the most is how big of an effort 
the creators have put into making testing such a huge part and important part. The beginners tutorial is very 
comprehensive and teaches you how to naturally test your web app.

Angular JS provides a lot of good features. Two way binding, that together with the templates makes updating the UI very simple.
Directives lets you create your own DOM elements, this is a very useful for making reusable UI components.


Angular's implementation of Dependency injection works really well, and helps keeping your code modular and testable. You can inject Angular's built-in services or create your own.
Simply define the services you need as parameters and they will automatically be passed to you.

Example:

    MyAapp.controller('Ctrl', function($scope, adminService){

    }


This controller depends on Angular's $scope variable, and my custom service adminService.

This makes it very easy to test a controller since you can just create your own fake $scope and adminService and pass to the controller.

Angular is the best framework I have ever used.


##Node JS and Express JS##

[Node JS](http://nodejs.org/) 0.8.x is awesome, I knew that. You have low level access to a lot of stuff,
but at the same time [Express](http://expressjs.com/) JS gives you a lot of shortcuts to make your life a lot easier and faster.
Express JS is a lightweight framework the neccesary functionaliy you need and would expect from a web framework.

I work with Django everyday, and how big of a relief it is to work with Express JS. Everything just works, and there's little to no weird magic going on.

##Nodejitsu##

[Nodejitsu](https://www.nodejitsu.com/) needs to be mentioned. It is cheap, it is simple, it has great support, and it is how hosting should be like.


##Mocha, Jasmine and Testacular##

[Mocha](http://visionmedia.github.com/mocha/) and [Jasmine](http://pivotal.github.com/jasmine/) are two different testing frameworks, while [Testacular](http://testacular.github.com/) is a testrunner. You can use both Mocha and Jasmine with Testacular (I have only tried Jasmine).

Both Jasmine and Mocha have pretty much the same syntax: you describe a problem and assert conditions. 
You can use separate assertion libraries, such as [should.js](https://github.com/visionmedia/should.js/)


    describe('a feature', function(){
      it('should do something', function(){
          should.not.exist(true);
      });
    })


The biggest advantage Mocha has is the ability to call a callback whenever you are done.
This is very benefitial if you are waiting for something to happen.


    describe('a feature', function(){
      it('should do something', function(done){
          interact(function(){
            //test your stuff,
            done();
          })
      });
    })

Jasmine doesn't support before and after, test functions, only beforeEach, and afterEach, which can be annoying.

Testacular makes it possible to run both unit and e2e tests. I did not have any problems with unittesting, however,
the e2e tests took a quite some time to figure out.

It turns out that you need two different config files for this to work, and if you include the wrong files nothing seems to work.

Testacular opens a browser instance and does whatever you defined in your script.
It let you pause wherever you want to investigate states and to see why your test fails in a certain scenario.
