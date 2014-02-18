var cheerio             = require('cheerio');
var Data                = require('../../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var LevelMatcherData	= require('./dashboard.levels.matchers');
var dashboard			= require('./lib/display.dashboard.js');
var response			= require('../../support/fake.response');
var array               = require('../../utils/lib/array.utils');

describe('The progress bar', function() {
	
	var database = new Data();
	var page;
	var world;
	var level;
	var player;
	
	var totalLevelCount;
	
	beforeEach(function() {
        totalLevelCount = 0;
        array.forEach(database.worlds, function(world) {
            totalLevelCount += world.levels.length;
        });
    });
	
	var loadPageWithDatabase = function(database) {
		database.worlds[0].isOpenFor = function(player) { return true; };
		database.worlds[1].isOpenFor = function(player) { return true; };
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
			};
			loadPageWithDatabase(database);
		});
		
        it('is visible', function(){
            expect(page('#server-of-player-area').attr('class')).toEqual('visible');
        });

		it('is empty', function() {
			expect(page('.progress-bar').attr('style')).toEqual('width:0%');
		});

	});
	
	describe('of a player with a portfolio', function() {
		
		beforeEach(function() {	
			player = {
				login: 'ericminio',	
				portfolio: [ { server: 'this-server', achievements: [1] } ]
			};
			loadPageWithDatabase(database);
		});
		
		it('is in sync with the portfolio', function() {
            var percentage = Math.round(100 * 1 / totalLevelCount);
            var style = 'width:' + percentage + '%';
			
            expect(page('.progress-bar').attr('style')).toEqual(style);
		});

	});
	
});