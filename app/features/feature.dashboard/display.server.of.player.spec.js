var cheerio 			= require('cheerio');
var Data	 			= require('../../support/database.with.levels');
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
	
	it('offers to navigate to the server of the player', function() {
		expect(page('#server-of-player').attr('href')).toEqual('this-server');
	});
	
});