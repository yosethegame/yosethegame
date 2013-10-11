var cheerio 			= require('cheerio');
var Data	 			= require('../support/database.with.levels');
var WorldMatcherData	= require('./dashboard.worlds.matchers');
var dashboard			= require('../../public/feature.dashboard/display.dashboard.js');
var response			= require('../support/fake.response');

describe('Dashboard of a new player', function() {
	
	var database = new Data();
	var page;
	var world;

	beforeEach(function() {	
		database.players = [ { login: 'ericminio', } ];
		dashboard({ url: '/players/ericminio' }, response, database);
		page = cheerio.load(response.html);
		
		world = new WorldMatcherData(page, database);
	});
	
	it('displays the first world', function() {
		expect(world.number(1)).toBeOpen();
	});
	
	it('displays the second world as locked', function() {
		expect(world.number(2)).toBeLocked();
	});
	
});