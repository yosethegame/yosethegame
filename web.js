var router = require('./public/js/router');
var Server = require('./public/js/server');
var ProductionDatabase = require('./public/js/productionDatabase');

var server = new Server(router);
var database = new ProductionDatabase();
server.useDatabase(database);

var ericminio = {
	login: 'ericminio',
	avatar: 'http://www.gravatar.com/avatar/8274a8b8d2c4aa2f42c1bbe2f130a0a7.png'
};

pablo = {
	login: 'pablolis',
	avatar: 'https://si0.twimg.com/profile_images/2225960371/PabloL_normal.jpg'
};

var carl = {
	login: 'cletourneau',
	avatar: 'https://si0.twimg.com/profile_images/2168665726/profile_pic_bigger.jpg'
};

var vince = {
	login: 'testinfected',
	avatar: 'https://si0.twimg.com/profile_images/268189950/vince_250x250_bigger.jpg'
};

andre = {
	login: 'AndreBrissette',
	avatar: 'https://si0.twimg.com/profile_images/1900139453/andre_brissette_200_bigger.jpg'
};

database.createPlayer(ericminio, function() {
	database.createPlayer(pablo, function() {
		database.createPlayer(carl, function() {
			database.createPlayer(vince, function() {
				database.createPlayer(andre, function() {
				});
			});
		});
	});
});

server.start();
