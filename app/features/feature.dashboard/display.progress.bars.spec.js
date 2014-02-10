var cheerio 			= require('cheerio');
var Data	 			= require('../../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');

describe('The progress bar', function() {
	
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
			}
			loadPageWithDatabase(database);
		});
		
		it('is empty', function() {
			expect(world.number(1)).toHaveProgressBarOf('0%');
		});

	});
	
	describe('of a player with a portfolio', function() {
		
		beforeEach(function() {	
			player = {
				login: 'ericminio', 			
				portfolio: [ { server: 'this-server', achievements: [1] } ]
			}
			loadPageWithDatabase(database);
		});
		
		it('is in sync with the portfolio', function() {
			expect(world.number(1)).toHaveProgressBarOf('50%');
		});

	});
	
	describe('of a player with a portfolio that might lead to not rounded value', function() {
		
		beforeEach(function() {	
			player = {
				login: 'ericminio', 			
				portfolio: [ { server: 'this-server', achievements: [1, 2, 3] } ]
			}
			loadPageWithDatabase(database);
		});
		
		it('is rounded', function() {
			expect(world.number(2)).toHaveProgressBarOf('33%');
		});

	});
	
});