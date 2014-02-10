var cheerio 			= require('cheerio');
var Data	 			= require('../../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');

describe('The Restart game link', function() {
	
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
	
	describe('for a new player', function() {
		
		beforeEach(function() {	
			player = {
				login: 'ericminio', 			
			}
			loadPageWithDatabase(database);
		});
		
		it('is hidden', function() {
			expect(page('#restart-game-link').attr('class')).toContain('hidden');
		});

	});
	
	describe('for a player with a portfolio', function() {
		
		beforeEach(function() {	
			player = {
				login: 'ericminio', 			
				portfolio: [ { server: 'any', achievements: [1] } ]
			}
			loadPageWithDatabase(database);
		});
		
		it('is visible', function() {
			expect(page('#restart-game-link').attr('class')).toContain('visible');
		});

	});
	
});