var cheerio             = require('cheerio');
var Data                = require('../../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');

describe('The rerun all levels link:', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	var player;
	
	var loadPageWithDatabase = function(database) {
		database.worlds[0].isOpenFor = function(player) { return true; };
		database.players = [ player ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);
		
		world = new WorldMatcherData(page, database);
		level = new LevelMatcherData(page, database);
	};
	
	it('is hidden by default', function() {
		player = { login: 'ericminio' };
		loadPageWithDatabase(database);

        expect(page('#rerun-world-1-link').attr('class')).toContain('hidden');
	});

	it('is displayed when the world is completed', function() {
        player = { login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1, 2] } ]
		};
		loadPageWithDatabase(database);

        expect(page('#rerun-world-1-link').attr('class')).toContain('visible');
	});
	
	it('is not displayed when the world is not completed', function() {
        player = { login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1] } ]
		};
		loadPageWithDatabase(database);

        expect(page('#rerun-world-1-link').attr('class')).toContain('hidden');
	});
	
	it('targets rerun of the world for the player', function() {
        player = { login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1, 2] } ]
		};
		loadPageWithDatabase(database);

        expect(page('#rerun-world-1-link').attr('href')).toEqual('/players/ericminio/rerun/world/1');
	});
	
});