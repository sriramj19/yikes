# yikes!

a [Sails](http://sailsjs.org) application

Yikes! is a simple chat application based upon the following stack:
[1] Angular.js
[2] Sails.js
[3] MongoDB

To make use of this wonderful application in your own systems, clone or download this repository:

* Install Node.js and with it NPM Package Manager
* Run 'npm i sails --g' to install Sails.js
* Open cmd or terminal in this application directory and run 'npm install'
* In the same directory run 'sails lift'
* Now it is all set and you can view the application from the browser at 'http://localhost:1337'

The core logic of the application lies in the fact that the chats use web sockets
to function asynchronously, meaning that no conventional API calls or request-responses
happen. Instead, once a user gets into his dashboard, he subscribed to the server
for listening to changes so that any new chat is transmitted asynschronously.

The database is hosted on mLab so that conventional and default data can be used
to smoothen the workflow and demo experience.

Star it if you like it! :D
