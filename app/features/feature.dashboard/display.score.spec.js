var cheerio 			= require('cheerio');
var Data	 			= require('../../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');

describe('The score label', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	var player;
	
	var loadPageWithDatabase = function(database) {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.players = [ player ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);
		
		world = new WorldMatcherData(page, database);
		level = new LevelMatcherData(page, database);
	};
	
	describe('of a new player', function() {
		
		beforeEach(function() {	
			player = {
				login: 'ericminio', 			
				score: 0
			}
			loadPageWithDatabase(database);
		});
		
		it('is zero', function() {
			expect(page('#score').text()).toEqual('000000');
		});

	});
	
	describe('of a player with a score', function() {
		
		beforeEach(function() {	
			player = {
				login: 'ericminio', 			
				score: 123456
			}
			loadPageWithDatabase(database);
		});
		
		it('is updated with the value of the score', function() {
			expect(page('#score').text()).toEqual('123456');
		});

	});
		
});