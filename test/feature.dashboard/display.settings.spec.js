var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var dashboard	= require('../../public/feature.dashboard/display.dashboard.js');
var response	= require('../support/fake.response');

describe('The settings link', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		database.players = [ { login: 'ericminio' } ];
	});
	
	it('targets the specific settings of the player', function() {
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);

		expect(page('a#settings-link').href).toEqual('/players/ericminio/settings');
	});
	
});