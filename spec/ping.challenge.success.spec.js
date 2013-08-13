var Browser = require("zombie");
var Router = require('../public/js/router');
var Server = require('../public/js/server');
var FileDatabase = require('../public/js/fileDatabase');
var fs = require('fs');

describe("Successing the Ping challenge", function() {

	var remote;
	var server = new Server(new Router());
	var database;
	
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
				login: 'annessou'
			});
		database.challenges = [
			{
				title: 'Get ready for fun :)',
				file: 'public/challenge.ping/ping.html'
			}];
		server.useRepository(database);
		
		server.start();
	});

	afterEach(function() {
		server.stop();
		remote.close();
	});
	
	it('makes the Ping challenge to be in the portfolio of the player', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/players/annessou').
			then(function () {
				return browser.fill("#server", "http://localhost:6000")
					   .pressButton("#try");
			}).
			then(function() {
				expect(database.find('annessou').portfolio[0].title).toEqual('Get ready for fun :)')
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});		
	});
		
});
		
		
