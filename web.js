var Router = require('./public/js/router');
var Server = require('./public/js/server');
var FileDatabase = require('./public/js/fileDatabase');

var server = new Server(new Router());

var fileDatabase = new FileDatabase('players');
fileDatabase.challenges = [
	{
		title: 'Get ready',
		file: 'public/challenge.ping/ping.html'
	}
	
];

fileDatabase.createPlayer({
		login: 'ericminio',
		avatar: 'http://www.gravatar.com/avatar/8274a8b8d2c4aa2f42c1bbe2f130a0a7.png'
	});


server.useRepository(fileDatabase);

server.start();