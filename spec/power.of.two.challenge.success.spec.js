var Browser = require("zombie");
var Router = require('../public/js/router');
var Server = require('../public/js/server');
var FileDatabase = require('../public/js/fileDatabase');
var fs = require('fs');

describe("Successing the Power-Of-Two challenge", function() {

	var remote;
	var router = new Router();
	var server = new Server(router);
	var database;
	var expectedAnswer = { 
			number: 8,
			decomposition: [2, 2, 2]
		};
	
	beforeEach(function() {
		router.endPointOf({ url :'/tryPowerOfTwo'}).expectedAnswer = function() { return expectedAnswer; };
		
		remote = require('http').createServer(
			function (request, response) {
				response.writeHead(200, {'Content-Type': 'application/json'});
				response.write(JSON.stringify(expectedAnswer));
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
				portfolio : [
					{
						title : 'Get ready for fun :)',
					}
				]
			});
		database.challenges = [
			{
				title: 'Get ready for fun :)',
				file: 'public/challenge.ping/ping.html'
			},
			{
				title: 'Power Of Two challenge',
				file: 'public/challenge.primeFactors/power.of.two.html'
			},
			];
		server.useRepository(database);
		
		server.start();
	});

	afterEach(function() {
		server.stop();
		remote.close();
	});
	
	it('makes the Power-Of-Two challenge to be in the portfolio of the player', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/players/annessou').
			then(function () {
				return browser.fill("#server", "http://localhost:6000")
					   .pressButton("#try");
			}).
			then(function() {
				expect(database.find('annessou').portfolio.length).toEqual(2);
				done();
			}).
			then(function() {
				expect(database.find('annessou').portfolio[1].title).toEqual('Power Of Two challenge');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});		
	});
		
});
		
		
