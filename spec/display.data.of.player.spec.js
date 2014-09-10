var request = require('request');
var router = require('../app/lib/router');
var Server = require('../app/lib/server');
var InMemoryDatabase = require('../app/support/database.with.levels');

describe('Data of player endpoint', function() {
   
	var server = new Server(router);
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [
            {
                login: 'ericminio',
                score: 120,
                avatar: 'sky.png'
            }
        ];
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

    it('returns json', function(done) {
		request("http://localhost:5000/players/ericminio/data", function(error, response, body) {
            expect(response.headers['content-type']).toEqual('application/json');
			done();
		});			
    });
    
    it('returns the data of the player', function(done) {
		request("http://localhost:5000/players/ericminio/data", function(error, response, body) {
            expect(JSON.parse(body)).toEqual(
                { 
                    login: 'ericminio',
                    score: 120,
                    avatar: 'sky.png' 
                });
			done();
		});			
    });
    
    it('returns not found when the player does not exists', function() {
		request("http://localhost:5000/players/unknown/data", function(error, response, body) {
            expect(response.statusCode).toEqual(404);
            expect(body.length).toEqual(0);
			done();
		});			
    });
});