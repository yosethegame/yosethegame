var Browser 				= require("zombie");
var router 					= require('../app/lib/router');
var Server 					= require('../app/lib/server');
var DatabaseWithChallenges 	= require('../app/support/database.with.levels');
var fs 						= require('fs');

describe("Challenge Emergency in WorldFire", function() {

	var server = new Server(router);
	var remote;
	var database;
	
	beforeEach(function() {
		remote = require('http').createServer(
			function (request, response) {
				var extractMap = require('../app/challenges/world.fire/challenge.common/lib/extract.map');
				var equal = require('deep-equal');
				var Requester = require('../app/challenges/world.fire/challenge.emergency/lib/emergency.requester');
				var move = require('../app/challenges/world.fire/challenge.common/lib/move');

				response.writeHead(200, {"Content-Type": "application/json"});

				var sentMap = extractMap(request.url);
				var requester = new Requester('any');
				var mapIndex = 0;
				for (var i=0; i<requester.candidates.length; i++) {
					if (equal(requester.candidates[i].map, sentMap)) {
						mapIndex = i;
					}
				}
				var moves = [ 	[move.down, move.down, move.down, move.down, move.left], 
								[move.right, move.right, move.right, move.right, move.up, move.up, move.left], 
								[move.right, move.right, move.right, move.right, move.left, move.left, move.down], 
								[move.down, move.down, move.down, move.down, move.right, move.left, move.left] ];				
				var answer = { map: sentMap, moves: moves[mapIndex] };

				response.write(JSON.stringify(answer));
				response.end();
			})
		.listen(6000);			

		var InMemoryDatabase = require('../app/support/inMemoryDatabase');
		database = new InMemoryDatabase();
		database.worlds = [{
			name: 'world 1',
			levels: [ 
				{
					id: 1,
					title: 'Emergency',
					requester: '../../../../app/challenges/world.fire/challenge.emergency/lib/emergency.requester.js',
					checker: '../../../../app/challenges/world.fire/challenge.emergency/lib/emergency.response.matcher.js',
					isOpenLevelFor: function(player) { return true; }
				}
			],
			isOpenFor: function(player) { return true; }
		}];
		
		database.players = [
			{
				login: 'annessou',
				avatar: 'asm',
				portfolio: [ { server: 'http://localhost:6000', achievements: [] } ]
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		remote.close();
		server.stop();
	});
	
	it('can be passed', function(done) {
		var browser = new Browser();
		browser.visit('http://localhost:5000/players/annessou/play/world/1/level/1').
			then(function () {
				return browser.pressButton("#try");
			}).
			then(function() {
				expect(browser.text("#result_1 .challenge")).toEqual(database.worlds[0].levels[0].title);
			}).
			then(function() {
				expect(browser.text("#result_1 .status")).toEqual('success');
			}).
			then(function() {
				expect(browser.text("#result_1 .expected")).toContain('moves to minimize the flight to water and fire. map =');
			}).
			then(function() {
				expect(browser.text("#result_1 .got")).toEqual('You did it!');
				done();
			}).
			fail(function(error) {
				expect(error.toString()).toBeNull();
				done();
			});
	});
});
		
		
