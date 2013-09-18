var router = require('./public/js/router');
var Server = require('./public/js/server');
var ProductionDatabase = require('./public/js/productionDatabase');

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

database.createPlayer({
	login: 'cletourneau',
	avatar: 'https://si0.twimg.com/profile_images/2168665726/profile_pic_bigger.jpg'
});

database.createPlayer({
	login: 'testinfected',
	avatar: 'https://si0.twimg.com/profile_images/268189950/vince_250x250_bigger.jpg'
});

database.createPlayer({
	login: 'AndreBrissette',
	avatar: 'https://si0.twimg.com/profile_images/1900139453/andre_brissette_200_bigger.jpg'
});

server.useDatabase(database);

server.start();