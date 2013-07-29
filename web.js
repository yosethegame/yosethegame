var Router = require('./public/js/router');
var Server = require('./public/js/server');

var server = new Server(new Router());
server.start();