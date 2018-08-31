var request = require('request');
var router = require('../app/lib/router');
var Server = require('../app/lib/server');
var InMemoryDatabase = require('../app/support/database.with.levels');

describe('PNG Badge of player endpoint', function() {
   
	var server = new Server(router);
    var url = "http://localhost:5000/players/ericminio/badge.png";
	
	beforeEach(function() {
		database = new InMemoryDatabase();
		database.players = [
            {
                login: 'ericminio',
                score: 168421,
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
    
    it('returns png content type', function(done) {
		request(url, function(error, response, body) {
            expect(response.headers['content-type']).toContain('image/png');
			done();
		});			
    });
    
    it('returns not found when the player does not exists', function(done) {
		request("http://localhost:5000/players/unknown/badge.png", function(error, response, body) {
            expect(response.statusCode).toEqual(404);
            expect(body.length).toEqual(0);
			done();
		});			
	});
	
	it('builds the expected image', function(done) {
		var fs = require('fs');
		var expectedContent = fs.readFileSync('app/features/feature.badge.of.player/168421.png', 'binary');
					
		request({ url:url, encoding: 'binary' }, function(error, response, body) {
            expect(body).toEqual(expectedContent);
			done();
		});		
	}); 
});