var router = require('./public/js/router');
var Server = require('./public/js/server');
var ProductionDatabase = require('./public/js/production.database');

var server = new Server(router);
var database = new ProductionDatabase();
server.useDatabase(database);

var ericminio = {
	login: 'ericminio',
	avatar: 'https://si0.twimg.com/profile_images/848367249/moi_bigger.jpg'
};

database.createPlayer(ericminio, function() {
});

server.start();
