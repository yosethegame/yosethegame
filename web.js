var Router = require('./public/js/router');
var Server = require('./public/js/server');
var ProductionFileDatabase = require('./public/js/productionFileDatabase');

var server = new Server(new Router());

var database = new ProductionFileDatabase();

database.createPlayer({
		login: 'ericminio',
		avatar: 'http://www.gravatar.com/avatar/8274a8b8d2c4aa2f42c1bbe2f130a0a7.png'
	});


server.useRepository(database);

server.start();