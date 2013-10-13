var cheerio 			= require('cheerio');
var Data	 			= require('../support/database.with.levels');
var dashboard			= require('../../public/feature.dashboard/display.dashboard.js');
var response			= require('../support/fake.response');

describe('The warm welcome message', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		player = {
			login: 'ericminio', 			
			server: 'this-server'
		}
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[1].isOpenFor = function(player) { return true; }
		database.players = [ player ];
	});
	
	it('mentions the player', function() {
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#greetings').text()).toEqual('Welcome home ericminio :)');
	});
	
	
});