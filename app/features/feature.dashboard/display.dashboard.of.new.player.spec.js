var cheerio 			= require('cheerio');
var Data	 			= require('../../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');

describe('The dashboard of a new player', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	
	var loadPageWithDatabase = function(database) {
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
		expect(world.number(2)).toBeALockedWorld();
	});
	
	describe('When only the first level of first world is open', function() {
	    
		beforeEach(function() {
			database.worlds[0].levels = [ 
			    { title: 'first challenge',  isOpenLevelFor: function(player) { return true; } }, 
			    { title: 'second challenge', isOpenLevelFor: function(player) { return false; } }, 
			    { title: 'third challenge',  isOpenLevelFor: function(player) { return false; } }
			];
			loadPageWithDatabase(database);
		});
		
    	it('invites the player to play level 1.1', function() {
    		expect(level.number(1, 1)).toBePlayableBy('ericminio');
    	});

    	it('displays level 1.2 as locked', function() {
    		expect(level.number(1, 2)).toBeALockedLevel();
    	});

		it('does not clue the third level', function() {
			expect(world.number(1)).toHaveLevelCount(2);
		});
		
	});
	
	describe('When the two first levels of first world are open', function() {
	    
		beforeEach(function() {
			database.worlds[0].levels = [ 
			    { title: 'first challenge',  isOpenLevelFor: function(player) { return true; } }, 
			    { title: 'second challenge', isOpenLevelFor: function(player) { return true; } }
			];
			loadPageWithDatabase(database);
		});
		
    	it('invites the player to play level 1.1', function() {
    		expect(level.number(1, 1)).toBePlayableBy('ericminio');
    	});

    	it('invites the player to play level 1.2', function() {
    		expect(level.number(1, 2)).toBePlayableBy('ericminio');
    	});

		it('does not display the locker', function() {
			expect(world.number(1)).toHaveLevelCount(2);
		});
		
	});
});