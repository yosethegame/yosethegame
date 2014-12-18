var cheerio     = require('cheerio');
var Data        = require('../../support/database.with.levels');
var rerun       = require('./lib/display.rerun.request');
var response    = require('../../support/fake.response');

describe('The banner', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {	
		player = {
            login: 'ericminio',
			avatar: 'this-avatar',
			score: 42,
			portfolio: [ { server: 'this-server', achievements: [1, 2] } ]
		};
		database.worlds[0].isOpenFor = function(player) { return true; };
		database.players = [ player ];
		rerun({ url: '/players/ericminio/rerun/world/1' }, response, database);
		page = cheerio.load(response.html);
	});
	
	it('displays the avatar', function() {
		expect(page('#avatar').attr('src')).toEqual('this-avatar');
	});
	
	it('displays the score', function() {
		expect(page('#score').text()).toEqual('000042');
	});
	
	describe('Greetings', function() {
		
		it('contains the title of the level', function() {
			expect(page('#greetings').text()).toContain('Rerun the completed levels of ' + database.worlds[0].name);
		});
		
	});
	
	it('updates the link to the dashboard of the player', function() {
		expect(page('#dashboard-link').attr('href')).toEqual('/players/ericminio');
	});
	
	it('updates the link to the settings of the player', function() {
		expect(page('a#settings-link').attr('href')).toEqual('/players/ericminio/settings');
	});
});