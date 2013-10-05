var post 			 = require('../../public/feature.create.player/post.new.player.request');
var InMemoryDatabase = require('../support/InMemoryDatabase');

describe('Post player endpoint', function() {

	var database;
	var server;
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		server = require('http').createServer(function(request, response){
			post(request, response, database);
		}).listen(5000, 'localhost');
	});
		
	afterEach(function() {
		server.close();
	});
		
	it('creates the given player in database', function(done) {
		require('request').post('http://localhost:5000', {form: { login:'eric', avatar:'this-avatar' } }, function(error, response, body) {
			database.find('eric', function(player) {
				expect(player).toBeDefined();
				done();
			})
		});
	});
	
});
