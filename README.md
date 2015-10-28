Angular-node-cv
===============

Angular-node-cv is what it sounds like: my CV written in AngularJS. The backend is an RESTful API written in Node.js and ExpressJS.
If you want you can clone this repository and download it, simply follow the instructions below.

~~The project is hosted at [kimpettersen.org](http://kimpettersen.org)~~ This is temporarly taken down, a cleaner version will be available soon

If you have any questions or just want to say hello, talk to me on [Twitter](https://twitter.com/PettersenKim)

This is the documentation.

Why did I do this?
===================

There were many reasons. I wanted to learn how to design a RESTful API, learn Angular JS, and I am also looking for a new [job](http://kimpettersen.org).


What can you do with it?
========================

####Without installing anything, you can:####


* Give me a job offer!
* Perform a GET request to the API
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
on the server, and *Jasmine* and *Testacular testrunner* for the client side tests


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
