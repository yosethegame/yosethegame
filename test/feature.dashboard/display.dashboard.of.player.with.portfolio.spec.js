var cheerio 			= require('cheerio');
var Data	 			= require('../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('../../public/feature.dashboard/display.dashboard.js');
var response			= require('../support/fake.response');

describe('The dashboard of a player with a portfolio:', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	var player;
	
	var loadPageWithDatabase = function(database) {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return false; }
		database.players = [ player ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);
		
		world = new WorldMatcherData(page, database);
		level = new LevelMatcherData(page, database);
	};

	beforeEach(function() {	
		player = {
			login: 'ericminio', 			
			portfolio: [ { server: 'this-server', achievements: [1] } ]
		}
		loadPageWithDatabase(database);
	});
	
	it('shows the server of the player', function() {
		expect(page('#server-of-player').attr('class')).toContain('visible');
		expect(page('#server-of-player').text()).toEqual('this-server');
	});
	
	describe('When the player has done one out of two levels of the first world,', function() {
		
		beforeEach(function() {
			database.worlds[0].levels = [ { id: 1, title: 'first challenge' }, { id: 2, title: 'second challenge' } ];
			player.portfolio[0].achievements = [1];
			loadPageWithDatabase(database);
		});
		
		it('displays the first challenge as done', function() {
			expect(level.number(1, 1)).toBeDone();
		});
		
		it('invites the player to play the second level of the first world', function() {
			expect(level.number(1, 2)).toBePlayableBy('ericminio');
		});

		it('displays only these two levels', function() {
			expect(world.number(1)).toHaveLevelCount(2);
		});
	});

	describe('When the player has done one out of three levels of the first world,', function() {
		
		beforeEach(function() {
			database.worlds[0].levels = [ { id: 1, title: 'first challenge' }, { id: 2, title: 'second challenge' }, { id: 3, title: 'third challenge' } ];
			player.portfolio[0].achievements = [1];
			loadPageWithDatabase(database);
		});
		
		it('displays the first challenge as done', function() {
			expect(level.number(1, 1)).toBeDone();
		});
		
		it('invites the player to play the second level', function() {
			expect(level.number(1, 2)).toBePlayableBy('ericminio');
		});

		it('locks the third level', function() {
			expect(level.number(1, 3)).toBeLocked();
		});
	});

	describe('When the player has done two out of three levels of the first world,', function() {
		
		beforeEach(function() {
			database.worlds[0].levels = [ { id: 1, title: 'first challenge' }, { id: 2, title: 'second challenge' }, { id: 3, title: 'third challenge' } ];
			player.portfolio[0].achievements = [1, 2];
			loadPageWithDatabase(database);
		});
		
		it('displays the first challenge as done', function() {
			expect(level.number(1, 1)).toBeDone();
		});
		
		it('displays the second challenge as done', function() {
			expect(level.number(1, 2)).toBeDone();
		});

		it('invites the player to play the third level', function() {
			expect(level.number(1, 3)).toBePlayableBy('ericminio');
		});
		
		it('displays only these three levels', function() {
			expect(world.number(1)).toHaveLevelCount(3);
		});
		
	});
});