var cheerio     = require('cheerio');
var Data		= require('../../support/database.with.levels');
var playground	= require('./lib/display.playground.request.js');
var response	= require('../../support/fake.response');
var fs			= require('fs');

describe('Server input field', function() {
	
	var database = new Data();
	var page;
	var player;
	
	beforeEach(function() {
		var content =   '<html><body>' +
                            '<div id="challenge-assignment">this assignment</div>' +
                            '<div id="challenge-details">those details</div>' +
                            '<div id="challenge-tips">these tips</div>' +
                        '</body></html>';
		fs.writeFileSync('test-data/level-content', content);
		database.worlds[0].levels[0].file = 'test-data/level-content';
	});
	
	it('is displayed when the player has no server', function() {
		database.players = [ {login: 'ericminio'} ];
		playground({ url: '/players/ericminio/play/world/1/level/1' }, response, database);
		page = cheerio.load(response.html);

        expect(page("#server-input-section").attr('class')).toContain('visible');
	});

	it('is hidden when the player has a server', function() {
		database.worlds[0].levels[1].isOpenLevelFor = function(player) { return true; };
		player = {
			login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1] } ]
		};
		database.players = [ player ];
		playground({ url: '/players/ericminio/play/world/1/level/2' }, response, database);
		page = cheerio.load(response.html);

        expect(page("#server-input-section").attr('class')).toContain('hidden');
	});

	
});