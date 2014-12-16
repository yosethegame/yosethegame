var cheerio     = require('cheerio');
var Data		= require('../../support/database.with.levels');
var display	    = require('./lib/display.level.request.js');
var response	= require('../../support/fake.response');
var fs			= require('fs');

describe('Level description', function() {
	
	var page;
	var database = new Data();
	var levelFileContent;
	
	beforeEach(function() {	
		database.players = [ {
			login: 'ericminio',
            avatar: 'me.png',
			portfolio: [ { server: 'this-server', achievements: [1] } ]
		}];		
	});
	
	it('displays the title of the challenge', function() {
		database.worlds[0].levels[0].title = 'this is the title of the challenge';
		display({ url: '/players/ericminio/display/world/1/level/1' }, response, database);
		page = cheerio.load(response.html);

		expect(page('#next-challenge-title').text()).toEqual('this is the title of the challenge');
	});
    
	describe('content', function() {
	
        beforeEach(function() {
            levelFileContent =  '<html><body>' +
                                    '<div id="challenge-assignment">this assignment</div>' +
                                    '<div id="challenge-details">those details</div>' +
                                '</body></html>';
            fs.writeFileSync('test-data/level-content', levelFileContent);
            database.worlds[0].levels[0].file = 'test-data/level-content';
            display({ url: '/players/ericminio/display/world/1/level/1' }, response, database);
            page = cheerio.load(response.html);
        });

        it('displays the assignment of the challenge', function() {
            expect(page('#next-challenge-assignment').html()).toEqual('this assignment');
        });

        it('displays the details of the challenge', function() {
            expect(page('#next-challenge-details').html()).toEqual('those details');
        });
	});
	
});