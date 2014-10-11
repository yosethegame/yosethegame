var request = require('request');
var router = require('../app/lib/router');
var Server = require('../app/lib/server');
var InMemoryDatabase = require('../app/support/database.with.levels');

describe('Data of player endpoint', function() {
   
	var server = new Server(router);
    var url = "http://localhost:5000/players/ericminio/badge.svg";
	
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
		request(url, function(error, response, body) {
            expect(response.statusCode).toEqual(200);
			done();
		});			
    });
    
    it('returns svg content type', function(done) {
		request(url, function(error, response, body) {
            expect(response.headers['content-type']).toContain('image/svg+xml');
			done();
		});			
    });
    
    it('returns svg image', function(done) {
		request(url, function(error, response, body) {
            expect(body).toMatch(/^<svg/);
            expect(body).toMatch(/svg>$/);
			done();
		});			
    });
    
    it('returns the yose badge of the player', function(done) {
		request(url, function(error, response, body) {
            expect(body).toContain('>yose</text>');
            expect(body).toContain('>120</text>');
			done();
		});			
    });
    
    it('returns not found when the player does not exists', function() {
		request("http://localhost:5000/players/unknown/badge", function(error, response, body) {
            expect(response.statusCode).toEqual(404);
            expect(body.length).toEqual(0);
			done();
		});			
    });
});