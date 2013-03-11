Angular-node-cv
===============

Angular-node-cv is what it sounds like: my CV written in AngularJS. The backend is an (almost)RESTful API written in NodeJS and Express.
If you want you can clone this repository and download it, simply follow the instructions below.

The project is hosted at [kimpettersen.org](http://angularcv.jit.su)

If you have any questions or just want to say hello, Talk to me on [Twitter](https://twitter.com/PettersenKim)

This is the documentation, and my genreal thoughts about the result and process of this project.

Why did I do this?
===================

There were many reasons. I was not satisfied with my testing skills, I wanted to implement a REST api, and I wanted to learn Angular JS.
And I am also looking for a new, job preferably in NYC.


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
on the server, and Jasmine and Testacular for the tests on the front-end. The project also depends on the database content
in the e2e tests. I made this decission to figure out if mocking results actually gives you any benefits (it definitely does!).

##Important!##

Once you start the server with NODE_ENV set to test, it generates test data that the tests depends on.
You should therefore restart the node server when you switch between test types. Unittests are not affected by this,
but a failed e2e test can mess up the order.

##Run the tests##

*server unittests*: sh server_test.sh

*server e2e tests*: sh server_e2e.sh

*Restart server*

*Angular unittests*: sh test.sh

*server unittests*: sh e2e_test.sh

API Documentation
=================

All users can perform GET requests to all resources except getting a user. All other resources require authentication

The base URL for the resources is: http://kimpettersen.org/api/

The available resources are:

* education - an education item
* experience - an experience item
* me - an item that contains information about me
* user - the authenticated users
* bucketlist - a little extra detail for the ones reading this.

####Examples:####

To get all education resources: GET http://kimpettersen.org/api/education

To get one specific resources: GET http://kimpettersen.org/api/education/<id>

To create a new resources: POST http://kimpettersen.org/api/education/

To edit a resources: PUT http://kimpettersen.org/api/education/<id>

To delete a resources: DELETE http://kimpettersen.org/api/education/<id>


*NOTE:* Bucketlist is a list of things I want to learn. To access this list you would have to perform a GET request to:

http://kimpettersen.org/api/bucketlist


<del>You can also perform a POST request with a job offer to: http://kimpettersen.org/api/offer</del> -
This was mented to be an experimental feature, but it is just too risky.


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

Yes, I most certainly did. I feel like i am in a position where I can say that I know the pitfalls of testing,
I know a lot of Node JS, and Angular JS. The project definitely changed the way I write code to the better, and I can now make decissions that will lead to more testable code.

Overall, I am very satisfied about the result. This has been a very educational process.

##Would I have done anything differently?##

Yes, for sure. The project simply took too much of my time, so there are some parts I would have done differntly.


Code reuse was something I took very seriously, but I still decided to add five different resources.
This was sort of to make sure I could create a base controller and base models, so it would be less test duplication.
However all of these resources did basically the same thing. It stored text and tags. This led to a lot of time being wasted on
copying and pasting tests and code five different places.

This would have made sense if it was only an API: Since this is so tightly coupled to the front-end, and the
difference between the resources are minimal, it would have been a lot smarter to do this dynamically.

With a dynamic way of creating your own resources out of a combination of input and text areas, I would have had a
basic CMS. This is something I think the Javascript community needs, and something I intend to turn this project into.


The API is not completly RESTful, for starters it doesn't have any versioning and the server also handles the authentication sessions. I do however feel satisfied with what I've learned.


My experience testing
=====================

I tried a few different approaches to testing in this project. I will write a longer post about this soon, but this is a short summary of my experience.

My assumptions about testing:

* It helps you detect error you create by fixing other other bugs.
* It wil generally increase code quality.


What I know think of testing:

* It does helo you detect errors you create while fixing something else, but that is
not the biggest advantage.

* It helps you think make more modular code.
* You think about dependencies and how complicated you write the code.
* This makes the code more readable, easier to understand and easier to re-use.




About the technologies I've used.
================================

This is all based on my personal experience with developing the project and deploying it on
[Nodejitsu](https://www.nodejitsu.com/)


##Angular JS##

[Angular](http://angularjs.org) is an amazing framework! What I like the most is how big of an effort the creators have put into making testing such a huge part and important part. The beginners tutorial is very comprehensive and teaches you how to naturally test your web app.

Angular's implementation of Dependency injection works really well, and helps keeping your code modular and testable. You can inject Angular's built-in services or create your own.
Simply define the services you need as parameters and they will automatically be passed to you.

Example:

    MyAapp.controller('Ctrl', function($scope, adminService){

    }

This controller depends on Angular's $scope variable, and my custom service adminService.

This makes it very easy to test a controller since you can just create your own fake $scope and adminService and pass to the controller.

I would highly recommend to check out Angular JS! The documentation is a bit confusing sometimes, but it has a great and very responsive mailing list.


##Node JS and Express JS##

[Node JS](http://nodejs.org/) 0.8.x is awesome, I knew that. You have low level access to a lot of stuff, but at the same time Express JS gives you a lot of shortcuts to make your life a lot easier and faster. Express JS is a lightweight framework the neccesary functionaliy you need and would expect from a web framework.

I work with Django everyday, and during this project I realized how much easier it is to work with Express JS. Everything just works, and there's little to no weird magic going on.

##Nodejitsu##

[Nodejitsu](https://www.nodejitsu.com/) needs to be mentioned. It is cheap, it is simple, it has great support and it is how hosting should be like.


##Mocha, Jasmine and Testacular##

[Mocha](http://visionmedia.github.com/mocha/) and [Jasmine](http://pivotal.github.com/jasmine/) are two differnt testing framework, while [Testacular](http://testacular.github.com/) is a testrunner. You can use both Mocha and Jasmine with Testacular (I have only tried Jasmine).

Both Jasmine and Mocha has pretty much the same syntax. you describe a problem and assert conditions. You can use seperate assertion libraries, such as [should.js](https://github.com/visionmedia/should.js/)


    describe('a feature', function(){
      it('should do something', function(){
          should.not.exist(true);
      });
    })


The biggest difference advantage Mocha has is the ability to call a callback whenever you are done. This is very benefitial if you are waiting for something to happen.


    describe('a feature', function(){
      it('should do something', function(done){
          interact(function(){
            //test your stuff,
            done();
          })
      });
    })


Testacular makes it possible to run both unit and e2e tests. I did not have any problems with unittesting. However, the e2e tests gave me some issues. It took me a long time, and  lot of fiddling to understand how this works properly.

It turns out that you need two different config files for this to work, and if you include the wrong files nothing seems to work.

Testacular opens a browser instance and perform whatever you defined in your script. It let you pause wherever you want to investigate states and to see why your test fails in a certain scenario.

This is very helpful, but it took me a lot of time. A lot of configuration and a lot of silly small problems. This is one of the most time consumign parts of my project.

Testacular is still a young project, and it is definitely on its way to something good, but I feel that it is a bit more time consuming than it needs to be.
