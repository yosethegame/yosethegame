var cheerio = require('cheerio');
var search  = require('../../public/feature.search/search.request.js');
var InMemoryDatabase = require('../support/inMemoryDatabase');

describe('Search', function() {
  
  	var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	};
	var database = new InMemoryDatabase();
	var page;
	
	beforeEach(function() {	
	    database.findPlayersMatching = function(criteria, callback){
	        callback([ 
    	        { login: 'annessou',  avatar: 'asm.png',  tags: 'laval' , score: 20 , portfolio: [ { server: 'server of asm' }]}, 
    	        { login: 'ericminio', avatar: 'eric.png', tags: 'laval' , score: 10 },
    	    ]);
	    };
		search( { url: '/players/search/laval' }, response, database );
		page = cheerio.load(response.html);
	});
	
	it('updates the number of matching players', function() {
	   expect(page.html()).toContain('2 matching players') 
	});
    
	it('displays two lines + the header', function() {
	    expect(page('#players tr').length).toEqual(2 + 1);
	});
	
	it('displays the avatar of each player', function() {
	    expect(page.html('#players tr:nth-child(2) td.avatar-column')).toContain('asm.png');
	});
	
	describe('server', function() {
	    
    	it('displays the server of each player', function() {
    	    expect(page.html('#players tr:nth-child(2) td.server-column')).toContain('server of asm');
    	});

    	it('does not display an undefined server', function() {
    	    expect(page('#players tr:nth-child(3) td.server-column').html().trim()).toEqual('undefined');
    	});

	});
	
	it('displays the score of each player', function() {
	    expect(page.html('#players tr:nth-child(2) td.score-column')).toContain('20');
	});
    
});