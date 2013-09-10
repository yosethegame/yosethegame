var router = require('./public/js/router');
var Server = require('./public/js/server');
var ProductionFileDatabase = require('./public/js/productionDatabase');

var server = new Server(router);

var database = new ProductionDatabase();

database.createPlayer({
	login: 'ericminio',
	avatar: 'http://www.gravatar.com/avatar/8274a8b8d2c4aa2f42c1bbe2f130a0a7.png'
});

database.createPlayer({
	login: 'pablolis',
	avatar: 'https://si0.twimg.com/profile_images/2225960371/PabloL_normal.jpg'
});

server.useDatabase(database);

server.start();