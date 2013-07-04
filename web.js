var serving = require('./public/js/serving');
var Server = require('./public/js/server');

var server = new Server(serving('./public'));
server.start();