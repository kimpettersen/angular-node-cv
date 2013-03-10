Angular-node-cv
===============

Angular-node-cv is what it sounds like, my CV written in AngularJS. The backend is an (almost)RESTful API written in NodeJS and Express.
If you want you can clone this repository and download it, simply follow the instructions below.

The project is hosted at [kimpettersen.org](http://angularcv.jit.su)

If you have any questions or just want to say hello, Talk to me on [Twitter](https://twitter.com/PettersenKim)

Why am I doing this?
===================

There was many reasons. I was not satisfied with my testing skills, I wanted implement a REST api, and I wanted to learn Angular JS.
And I am also looking for a new job preferably in NYC.


What can you do with it?
========================

####Without installing anything you can:####


* Give me a job offer!
* Perform a GET request to the APU (There's list of things I want to do in the API)
* Look through the code
* Give me a code review or any type of feedback


####If you chose to install it you can also:####

* Run it locally
* Create, read, update and delete different items through the admin page and the API
 


Requirements
============

* [Mongodb](http://www.mongodb.org/) running locally 
* [Node JS](http://nodejs.org/) 0.8.x


Tests
=====

Since this is an experimental project I decided to follow a few different approaches. I use Mocha to run tests
on the server, and Jasmine and testacular for the tests on the front-end. I am also depending on the database content
in the e2e tests. I made this decission to figure out if mocking results actually gives you any benefits (it definitely does!).

##Important!##

Once you start the server with NODE_ENV set to test, it generates test data that the tests depends on.
You should therefor restart the node server when you switch between test types. Unittests are not affected by this,
but a failed e2e test can mess up the order.

##Run the tests##

*server unittests*: sh server_test.sh 

*server e2e tests*: sh server_e2e.sh 

*Restart server*

*Angular unittests*: sh test.sh

*server unittests*: sh e2e_test.sh


Summary, conclusion, and what not
===================================

##Did I reach my goals for this project?##

Yes, I most certanly did. I feel like i am in a position where I can say that I know the pitfalls of testing,
I know a lot of Node JS and Angular JS. The project certanly changed the way I write code to the better, and I can now make decissions
based on the testability.

##Would I have done anything differently?##

Yes, for sure. The project simply took too much of my time, so there's some parts I would have done differntly.

Added parts "to make it more interesting" I created a isDeleted flag instead of just performing a proper deletion.

Code reuse was something I took very seriously, but I still decided to add five different resources.
This was sort of to make sure I could create a base controllers and models, so it would be less testing, and more modular.
However all of these resources did basically the same thing. It stored text and tags. This led to a lot of time being wasted on
copying and pasting tests and code five different places.

This would have made sense if it was only an API: Since this is so tightly coupled to the front-end, and the 
difference between the resources are minimal, it would have been a lot smarter to do this dynamically.

With a dynamic way of creating your own resources out of a combination of input and text areas, I would have had a
basic CMS. This is something I think the Javascript community needs, and something I intend to turns this project into.

