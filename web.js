var router = require('./public/js/router');
var Server = require('./public/js/server');
var ProductionDatabase = require('./public/js/productionDatabase');

var server = new Server(router);
var database = new ProductionDatabase();
server.useDatabase(database);

var ovaillancourt = {
	login: 'o_vaillancourt',
	avatar: 'https://si0.twimg.com/profile_images/1846958904/image_bigger.jpg'
};

database.createPlayer(ovaillancourt, function() {
});

server.start();
