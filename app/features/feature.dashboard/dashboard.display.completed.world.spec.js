var cheerio             = require('cheerio');
var Data                = require('../../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');

describe('When the player has completed a world', function() {
	
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
            portfolio: [ { server: 'this-server', achievements: [1, 2] } ]
        };
        loadPageWithDatabase(database);
    });

    it('shows this world has completed', function() {
        expect(world.number(1)).toBeCompleted();
    });
    
    it('displays the completed icon', function() {
        expect(page('#world-1 .world-ellipse .glyphicon-ok').length).toEqual(1);
    });
});