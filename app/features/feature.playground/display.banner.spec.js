var cheerio     = require('cheerio');
var Data		= require('../../support/database.with.levels');
var playground	= require('./lib/display.playground.request.js');
var response	= require('../../support/fake.response');

describe('The banner', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		player = {
            login: 'ericminio',
			avatar: 'this-avatar',
			score: 42
		};
		database.players = [ player ];
		playground({ url: '/players/ericminio/play/world/1/level/1' }, response, database);
		page = cheerio.load(response.html);
	});
	
	it('displays the avatar', function() {
		expect(page('#avatar').attr('src')).toEqual('this-avatar');
	});
	
	it('displays the score', function() {
		expect(page('#score').text()).toEqual('000042');
	});
	
	it('updates the link to the dashboard of the player', function() {
		expect(page('#dashboard-link').attr('href')).toEqual('/players/ericminio');
	});
	
	it('updates the link to the settings of the player', function() {
		expect(page('a#settings-link').attr('href')).toEqual('/players/ericminio/settings');
	});
});