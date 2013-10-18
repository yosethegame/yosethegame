var cheerio 			= require('cheerio');
var Data	 			= require('../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('../../public/feature.dashboard/display.dashboard.js');
var response			= require('../support/fake.response');

describe('The dashboard of a more advanced player:', function() {
	
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

	beforeEach(function() {	
		player = {
			login: 'ericminio', 			
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3, 4] } ]
		}
		loadPageWithDatabase(database);
	});
	
	it('displays all levels of portfolio as done', function() {
		expect(level.number(1, 1)).toBeDone();
		expect(level.number(1, 2)).toBeDone();
		expect(level.number(2, 1)).toBeDone();
		expect(level.number(2, 2)).toBeDone();
	});
	
	it('invites the player to play the next level', function() {
		expect(level.number(2, 3)).toBePlayableBy('ericminio');
	});
	
});