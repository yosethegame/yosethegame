var cheerio 			= require('cheerio');
var Data	 			= require('../support/database.with.levels');
var dashboard			= require('../../public/feature.dashboard/display.dashboard.js');
var response			= require('../support/fake.response');

describe('A restart world link', function() {
   
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
	
	beforeEach(function() {	
		player = {
			login: 'ericminio', 			
			portfolio: [ { server: 'any', achievements: [1, 2, 3, 4] } ]
		}
		loadPageWithDatabase(database);
	});		
		
   it('is displayed for world #1', function() {
       expect(page('#restart-world-1-link').text()).toEqual('Restart world');       
   });
   
   it('is displayed for world #2', function() {
       expect(page('#restart-world-2-link').text()).toEqual('Restart world');       
   });
   
});