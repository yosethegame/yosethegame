var request = require('request');
var router = require('../app/lib/router');
var Server = require('../app/lib/server');
var InMemoryDatabase = require('../app/support/database.with.levels');

describe('Data of player endpoint', function() {
   
	var server = new Server(router);
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
    
    it('is online', function(done) {
		request("http://localhost:5000/players/ericminio/data", function(error, response, body) {
            expect(response.statusCode).toEqual(200);
			done();
		});			
    });

});