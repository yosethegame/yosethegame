var post 			 = require('../../public/feature.settings/post.settings.request');
var InMemoryDatabase = require('../support/database.with.levels');

describe('Save settings endpoint', function() {

	var database;
	var server;
	
	beforeEach(function() {
		database = new InMemoryDatabase();
	    database.players = [ { login: 'eric', avatar: 'old-avatar' } ];
		server = require('http').createServer(function(request, response){
			post(request, response, database);
		}).listen(5000, 'localhost');
	});
		
	afterEach(function() {
		server.close();
	});
		
	it('updates the avatar of the player', function(done) {
		require('request').post('http://localhost:5000/save-settings', {form: { login:'eric', avatar:'new-avatar' } }, function(error, response, body) {
			database.find('eric', function(player) {
				expect(player.avatar).toEqual('new-avatar');
				done();
			});
		});
	});
	
	it('returns 204', function(done) {
		require('request').post('http://localhost:5000/save-settings', {form: { login:'eric', avatar:'this-avatar' } }, function(error, response, body) {
			expect(response.statusCode).toEqual(204);
			done();
		});
	});
});
