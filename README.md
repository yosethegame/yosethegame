[![Travis Build Status](https://img.shields.io/travis/yosethegame/yosethegame/master.svg)](https://travis-ci.org/yosethegame/yosethegame)
[![Coverage Status](https://img.shields.io/coveralls/yosethegame/yosethegame/master.svg)](https://coveralls.io/r/yosethegame/yosethegame?branch=master)

You've got Nutella on your nose :) 

See it live: http://yosethegame.com

### local install

* install PostgreSql, Nodejs
* create a database for yose and a postgresql user 
* set env variable DATABASE_URL to something like postgres://yose@localhost
* install dependencies: npm install
* check your install: jasmine-node app
* run yose: node app/lib/web.js
* access yose: http://localhost:5000

The user ericminio is created at startup.