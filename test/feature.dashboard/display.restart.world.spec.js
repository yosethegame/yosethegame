var cheerio 			= require('cheerio');
var Data	 			= require('../support/database.with.levels');
var dashboard			= require('../../public/feature.dashboard/display.dashboard.js');
var response			= require('../support/fake.response');

describe('When a player', function() {
   
	var database = new Data();
	var page;
	var player;
	
	var loadPageWithDatabase = function(database) {
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.players = [ player ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);
	};
	
	describe('has achievements for world #1,', function() {
	    
     	beforeEach(function() {	
     		player = {
     			login: 'ericminio', 			
     			portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id] } ]
     		}
     		loadPageWithDatabase(database);
     	});		

        it('displays a link to restart world #1', function() {
            expect(page('#restart-world-1-link').attr('class')).toContain('visible');
        });

	});

	describe('has achievements for world #2,', function() {
	    
     	beforeEach(function() {	
     		player = {
     			login: 'ericminio', 			
     			portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id, database.worlds[1].levels[0].id] } ]
     		}
     		loadPageWithDatabase(database);
     	});		

        it('displays a link to restart world #2', function() {
            expect(page('#restart-world-2-link').attr('class')).toContain('visible');
        });

	});

	describe('has no achievement for world #2,', function() {
	    
     	beforeEach(function() {	
     		player = {
     			login: 'ericminio', 			
     			portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id] } ]
     		}
     		loadPageWithDatabase(database);
     	});		

        it('hides the link to restart world #2', function() {
            expect(page('#restart-world-2-link').attr('class')).toContain('hidden');
        });

	});

});