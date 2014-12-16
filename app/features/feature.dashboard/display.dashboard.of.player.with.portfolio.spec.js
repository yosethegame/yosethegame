var cheerio             = require('cheerio');
var Data                = require('../../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');

describe('The dashboard of a player with a portfolio:', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	var player;
	
	var loadPageWithDatabase = function(database) {
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
		};
		loadPageWithDatabase(database);
	});
	
	it('shows the server section because the player has a server', function() {
		expect(page('#server-of-player').attr('class')).toContain('visible');
	});
	
	it('displays level 1.1 as done', function() {
        expect(level.number(1, 1)).toBeDoneBy('ericminio');
	});
	
	it('invites the player to play level 1.2', function() {
		expect(level.number(1, 2)).toBePlayableBy('ericminio');
	});

	it('displays only these two levels', function() {
		expect(world.number(1)).toHaveLevelCount(2);
	});
	
});