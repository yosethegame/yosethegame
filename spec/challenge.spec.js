var Browser = require("zombie");
var Router = require('../public/js/router');
var Server = require('../public/js/server');
var FileDatabase = require('../public/js/fileDatabase');
var fs = require('fs');

describe("Player's server record", function() {

	var server = new Server(new Router());
	
	beforeEach(function() {
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe("When player passes ping challenge", function() {
		
		var remote;

		beforeEach(function() {
			remote = require('http').createServer(
				function (request, response) {
					response.writeHead(200, {'Content-Type': 'application/json'});
					response.write(JSON.stringify({ alive: true }));
					response.end();
				})
			.listen(6000);
			
			database = new FileDatabase('spec/data');
			if (fs.existsSync('spec/data/player.annessou')) {
				fs.unlinkSync('spec/data/player.annessou');
			}
			database.createPlayer(
				{
					login: 'annessou',
				});
			database.challenges = [
				{
					title: 'Get ready for fun :)',
					file: 'public/challenge.ping/ping.html'
				}
				];
			server.useRepository(database);
		});

		afterEach(function() {
			remote.close();
		});

		it("saves the server used", function(done) {
			var browser = new Browser();
			browser.visit('http://localhost:5000/players/annessou').
				then(function () {
					return browser.fill("#server", "http://localhost:6000")
						   .pressButton("#try");
				}).
				then(function() {
					var player = database.find('annessou');
					expect(player.server).toEqual('http://localhost:6000');
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});		
		
	});
	
});
		
		
