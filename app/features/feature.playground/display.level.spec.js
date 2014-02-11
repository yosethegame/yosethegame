var cheerio     = require('cheerio');
var Data		= require('../../support/database.with.levels');
var playground	= require('./lib/display.playground.request.js');
var response	= require('../../support/fake.response');
var fs			= require('fs');

describe('Level invitation', function() {
	
	var database = new Data();
	var page;
	var player;
	var levelFileContent;
	
	beforeEach(function() {	
		database.worlds[1].isOpenFor = function(player) { return true; };
		database.worlds[1].levels[2].isOpenLevelFor = function(player) { return true; };
		player = {
			login: 'ericminio',
			portfolio: [ { server: 'this-server', achievements: [1, 2, 3, 4] } ]
		};
		database.players = [ player ];		
	});
	
	it('displays the title of the challenge', function() {
		database.worlds[1].levels[2].title = 'this is the next challenge';
		playground({ url: '/players/ericminio/play/world/2/level/3' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#next-challenge-title').text()).toEqual('this is the next challenge');
	});
	
	describe('content', function() {
	
        beforeEach(function() {
            levelFileContent =  '<html><body>' +
                                    '<div id="challenge-assignment">this assignment</div>' +
                                    '<div id="challenge-details">those details</div>' +
                                    '<div id="challenge-tips">these tips</div>' +
                                '</body></html>';
            fs.writeFileSync('test-data/level-content', levelFileContent);
            database.worlds[1].levels[2].file = 'test-data/level-content';
            playground({ url: '/players/ericminio/play/world/2/level/3' }, response, database);
            page = cheerio.load(response.html);
        });

        it('displays the assignment of the challenge', function() {
            expect(page('#next-challenge-assignment').html()).toEqual('this assignment');
        });

        it('displays the details of the challenge', function() {
            expect(page('#next-challenge-details').html()).toEqual('those details');
        });

        it('displays the tips of the challenge', function() {
            expect(page('#next-challenge-tips').html()).toEqual('these tips');
        });

	});
	
});