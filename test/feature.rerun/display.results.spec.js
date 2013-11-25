var cheerio 	= require('cheerio');
var Data		= require('../support/database.with.levels');
var rerun   	= require('../../public/feature.rerun/display.rerun.request.js');
var response	= require('../support/fake.response');

describe('Results table', function() {
	
	var database = new Data();
	var page;
	var player;
	var remote;
	
	beforeEach(function(done) {	
		database.worlds[0].isOpenFor = function(player) { return true; }
		database.worlds[0].levels[0].checker = '../../test/support/response.always.valid';
		database.worlds[0].levels[1].checker = '../../test/support/response.always.404';
		
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
	
	it('uses a remote server running', function(done) {
	    var request = require('request');
	    request('http://localhost:6000', function(error, remoteResponse, content) {
	        expect(error).toEqual(null);
	        done();
        });
	})
	
	describe('When rerunning completed world 1,', function() {
	    
	    beforeEach(function(done) {
    		player = {
    			login: 'ericminio',
    			portfolio: [ { server: 'http://localhost:6000', achievements: [1, 2] } ]
    		}
    		database.players = [ player ];
    		rerun({ url: '/players/ericminio/rerun/world/1' }, response, database, function() {
        		page = cheerio.load(response.html);
        		done();
    		});
	    });
	    
	    describe('First level rerun result', function() {
	        
        	it('contains the title of the level', function() {
        		expect(page('#results #result_1 .challenge').text()).toEqual(database.worlds[0].levels[0].title);
        	});

        	it('contains the status of this level', function() {
        		expect(page('#results #result_1 .status').text()).toEqual('success');
        	});
        	
        	it('displays the line as a success', function() {
        		expect(page('#results #result_1').attr('class')).toContain('success');
        	});

	    });

	    describe('Second level rerun result', function() {
	        
        	it('contains the title of the level', function() {
        		expect(page('#results #result_2 .challenge').text()).toEqual(database.worlds[0].levels[1].title);
        	});

        	it('contains the status of this level', function() {
        		expect(page('#results #result_2 .status').text()).toEqual('fail');
        	});
        	
        	it('displays the line as a fail', function() {
        		expect(page('#results #result_2').attr('class')).toContain('danger');
        	});

	    });
	});
	
});