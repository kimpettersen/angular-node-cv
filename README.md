Angular-node-cv
===============

Angular-node-cv is what it sounds like: my CV written in AngularJS. The backend is an (almost) RESTful API written in NodeJS and Express.
If you want you can clone this repository and download it, simply follow the instructions below.

The project is hosted at [kimpettersen.org](http://angularcv.jit.su)

If you have any questions or just want to say hello, talk to me on [Twitter](https://twitter.com/PettersenKim)

This is the documentation.

Why did I do this?
===================

There were many reasons. I wanted to learn how to design a RESTful API, learn Angular JS, and I am also looking for a new [job](http://kimpettersen.org).


What can you do with it?
========================

####Without installing anything, you can:####


* Give me a job offer!
* Perform a GET request to the API (There's list of things I want to do in the API)
* Look through the code
* Give me a code review or any type of feedback


####If you chose to clone it, you can also:####

* Run the system on localhost
* Run tests
* Create, read, update and delete different items through the admin page and the API


####Screenshot from the admin interface####
![Screenshot](https://raw.github.com/kimpettersen/angular-node-cv/master/admin.png)



Requirements
============

* [Mongodb](http://www.mongodb.org/) running locally
* [Node JS](http://nodejs.org/) 0.8.x


Tests
=====

Since this is an experimental project I decided to follow a few different approaches. I use *Mocha* to run tests
on the server, and *Jasmine* and *Testacular testrunner* for the tests front-end. The e2e tests depend on the database content, the reason
why is discussed further down.


##Important##

Once you start the server, it generates test data that the tests depend on.
You should therefore restart the *Node server* when you switch between test types. Unit tests are not affected by this,
but a failed test, can affect other tests.

##Run the tests##
*Start the server:* node server/index.js

*server unit tests*: sh server_test.sh

*server e2e tests*: sh server_e2e.sh

*Restart server*

*Angular unit tests*: sh test.sh

*server unit tests*: sh e2e_test.sh

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

To get all education resources:
GET http://kimpettersen.org/api/education

To get one specific resource:
GET http://kimpettersen.org/api/education/<id>

To create a new resource:
POST http://kimpettersen.org/api/education/

To edit a resource:
PUT http://kimpettersen.org/api/education/<id>

To delete a resource:
DELETE http://kimpettersen.org/api/education/<id>


*NOTE:* Bucketlist is a list of things I want to learn. To access this list you would have to perform a GET request to:

http://kimpettersen.org/api/bucketlist


<del>You can also perform a POST request with a job offer to: http://kimpettersen.org/api/offer</del> -
This was meant to be an experimental feature, but it is just too risky.

The environment is available on localhost:3000.

#####A test user is available:#####

* *username*: admin
* *password*: 1234

##Resource details##


####Education####

* institution: String
* degree: String
* description: String
* tags: [String],
* _id: Number,
* isDeleted: boolean


####Experience####

* company: String
* description: String
* duration: String
* tags: [String],
* _id: Number,
* isDeleted: boolean


####Me####

* title: String,
* description: String
* tags: [String],
* _id: Number,
* isDeleted: boolean


####User####

* username: String
* password: String,
* _id: Number,
* isDeleted: boolean


####Bucketlist####

* title: String
* description: String
* rating: Number,
* _id: Number,
* isDeleted: boolean


The json object to pass to the server should look something like this:

    {
      title: 'My title',
      description: 'My description',
      tags: ['one tag', 'another tag']
    }


Post-mortem
===========
I am very satisfied with the final result of this project. However if I would do this again, I would have done some things different. I will discuss this in the following section.


####The good stuff####

* I had a lot of fun

* I reached my personal goals far beyond my expectations. I feel very comfortable working with Node JS, Angular JS, RESTful API design.

* I properly understand the concept of software testing, the benefits of testing, 
and what testable code is. Before this project I thought that the biggest benefits of testing is that you will automatically know 
if you some of your code broke some other functionality. What I learned is that this is not entirely true, because 
*testing your code is beneficial in so many ways.*
To test your code, you need to write testable code. Generally, testable code leads to more modular code, which leads to more 
reusable, cleaner, and better code. So even if you don't write tests for your code (which is bad), you should still know how to write testable code.

* As a developer, I grew a lot more from working with this project than any other project I've done since university.

* I did a good job creating abstractions. Both client and server side has good abstractions for calls and communication with 
the database.

* It does what I initially wanted it to do.

* It is tested.


####The less good stuff####

* Bad planning. this made the project take a lot more time than I first hoped for.

* From a UX point of view, the admin interface is not great. This was out of my scope, but it would be nice to 
have a more intuitive admin interface.

* Because I chose to use Mongoose, which is an object document model for MongoDB, the system is tightly coupled. 
I wish I created this more as a client side CMS, where I could dynamically add different fields to the different resources. 
Angular JS, Express JS, and MongoDB is definitely capable of doing this. To do this I would have to start from scratch.
