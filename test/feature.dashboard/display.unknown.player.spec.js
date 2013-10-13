var cheerio 			= require('cheerio');
var Data	 			= require('../support/database.with.levels');
var dashboard			= require('../../public/feature.dashboard/display.dashboard.js');
var response			= require('../support/fake.response');

describe('Unknown player mention', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		player = {
			login: 'ericminio', 			
			score: 0
		}
		database.players = [ player ];
	});
	
	it('is hidden when player is known', function() {
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page.html()).toContain('hidden');
	});
	
	it('is visible when player is unknown', function() {
		dashboard({ url: '/players/stef' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#info').attr('class')).toContain('visible');
	});
	
		
});