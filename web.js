var Router = require('./public/js/router');
var Server = require('./public/js/server');

var server = new Server(new Router());

var repository = {
	players: [
		{
			login: 'ericminio',
			avatar: 'http://www.gravatar.com/avatar/8274a8b8d2c4aa2f42c1bbe2f130a0a7.png'
		},
		{
			login: 'annessou',
			avatar: 'https://lh6.googleusercontent.com/-sJ1pMYYvlAQ/AAAAAAAAAAI/AAAAAAAAACM/ZqVyRKEq2iQ/s90-c-k-no/photo.jpg'
		}
	],
	
	find: function(login) {
		for(i=0; i<this.players.length; i++) {
			if (this.players[i].login == login) {
				return this.players[i];
			}
		}
	}
};


server.useRepository(repository);

server.start();