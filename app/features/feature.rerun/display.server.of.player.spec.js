var cheerio     = require('cheerio');
var Data        = require('../../support/database.with.levels');
var rerun		= require('./lib/display.rerun.request.js');
var response	= require('../../support/fake.response');

describe('Display the server of the player:', function() {
	
	var database = new Data();
	var page;
	var player;
	var remote;
	
	beforeEach(function(done) {	
		database.worlds[0].isOpenFor = function(player) { return true; };
		database.worlds[0].levels[0].checker = '../../../support/response.always.valid';
		database.worlds[0].levels[1].checker = '../../../support/response.always.404';
		
		remote = require('http').createServer(
			function (request, response) {
                response.writeHead(200);
				response.end();
			})
		.listen(6000, done);
	});
	
	afterEach(function() {
		remote.close();
	});
	
	describe('When rerunning completed world 1,', function() {

        beforeEach(function(done) {
            player = {
                login: 'ericminio',
                portfolio: [ { server: 'http://localhost:6000', achievements: [1, 2] } ]
            };
            database.players = [ player ];
            rerun({ url: '/players/ericminio/rerun/world/1' }, response, database, function() {
                page = cheerio.load(response.html);
                done();
            });
        });
	
        it('shows the server of the player', function() {
            expect(page('#server-of-player').attr('class')).toContain('visible');
            expect(page('#server-of-player').text()).toEqual('http://localhost:6000');
        });
	
        it('offers to navigate to the server of the player', function() {
            expect(page('#server-of-player').attr('href')).toEqual('http://localhost:6000');
        });
    });
	
});