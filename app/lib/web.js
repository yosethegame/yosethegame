var router = require('./router');
var Server = require('./server');
var ProductionDatabase = require('./production.database');

var server = new Server(router);
var database = new ProductionDatabase();
server.useDatabase(database);

var ericminio = {
	login: 'ericminio',
	avatar: 'http://www.gravatar.com/avatar/8274a8b8d2c4aa2f42c1bbe2f130a0a7.png'
};

database.createPlayer(ericminio, function() {
});


server.start();
