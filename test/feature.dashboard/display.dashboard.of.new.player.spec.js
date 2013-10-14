var cheerio 			= require('cheerio');
var Data	 			= require('../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('../../public/feature.dashboard/display.dashboard.js');
var response			= require('../support/fake.response');

describe('The dashboard of a new player', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	
	var loadPageWithDatabase = function(database) {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return false; }
		database.players = [ { login: 'ericminio', } ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);
		
		world = new WorldMatcherData(page, database);
		level = new LevelMatcherData(page, database);
	};

	beforeEach(function() {	
		loadPageWithDatabase(database);
	});
	
	it('hides the server section because the player has not yet declared a server', function() {
		expect(page('#server-of-player').attr('class')).toContain('hidden');
	});
	
	it('displays the first world', function() {
		expect(world.number(1)).toBeOpen();
	});
	
	it('displays the second world as locked', function() {
		expect(world.number(2)).toBeLocked();
	});
	
	it('invites the player to play level 1.1', function() {
		expect(level.number(1, 1)).toBePlayableBy('ericminio');
	});
	
	describe('When first world has more than one level,', function() {
		
		beforeEach(function() {
			database.worlds[0].levels = [ { title: 'first challenge' }, { title: 'second challenge' }, { title: 'third challenge' } ];
			loadPageWithDatabase(database);
		});
		
		it('hides the second challenge', function() {
			expect(level.number(1, 2)).toBeLocked();
		});
		
		it('displays only one locker', function() {
			expect(world.number(1)).toHaveLevelCount(2);
		});
		
	});
	
	describe('When the first world has exactly one level,', function() {
		
		beforeEach(function() {
			database.worlds[0].levels = [ { title: 'first challenge' } ];
			loadPageWithDatabase(database);
		});
		
		it('displays only this level', function() {
			expect(world.number(1)).toHaveLevelCount(1);
		});
		
	});
	
});