var Browser = require("zombie");
var router = require('../public/js/router');
var Server = require('../public/js/server');
var InMemoryDatabase = require('../test/support/InMemoryDatabase');

describe("Home page", function() {

	var server;
	var browser;
	
	beforeEach(function() {
		server = new Server(router);
		browser = new Browser();

		database = new InMemoryDatabase();
		database.players = [
			{
				login: 'annessou',
				avatar: 'https://si0.twimg.com/profile_images/850192180/Galice_AS_bigger.jpg'
			},
			{
				login: 'bilou',
				avatar: 'https://si0.twimg.com/profile_images/2646228289/8e597d3fd146485733ad4f132738898d_bigger.png',
				portfolio: [ { title: 'challenge 1.1' } ]
			}
		];
		database.levels = [
			{
				number: 1,
				name: 'level 1',
				challenges: [
					{
						title: 'challenge 1.1',
						file: '../spec/data/dummy.html',
						requester: '../../test/support/empty.request',
						checker: '../../test/support/response.always.valid',
					}				]
			}
		];
		server.useDatabase(database);
		server.start();
	});

	afterEach(function() {
		server.stop();
	});
	
	describe('player list', function() {
	
		it('has one line for each player', function(done) {
			
			browser.visit("http://localhost:5000").
				then(function() {
					expect(browser.queryAll("#players .player").length).toEqual(2);
					done();
				}).
				fail(function(error) {
					expect(error.toString()).toBeNull();
					done();
				});
		});
	
	});
			
});