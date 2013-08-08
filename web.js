var Router = require('./public/js/router');
var Server = require('./public/js/server');
var InMemoryDatabase = require('./public/js/inMemoryDatabase');

var server = new Server(new Router());

var repository = new InMemoryDatabase().withPlayers([
		{
			login: 'ericminio',
			avatar: 'http://www.gravatar.com/avatar/8274a8b8d2c4aa2f42c1bbe2f130a0a7.png'
		},
		{
			login: 'annessou',
			avatar: 'https://lh6.googleusercontent.com/-sJ1pMYYvlAQ/AAAAAAAAAAI/AAAAAAAAACM/ZqVyRKEq2iQ/s90-c-k-no/photo.jpg'
		}
	]);


server.useRepository(repository);

server.start();