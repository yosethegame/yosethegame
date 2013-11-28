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
    	        { login: 'annessou',  avatar: 'asm.png', tags: 'laval' , score: 20 }, 
    	        { login: 'ericminio', avatar: 'eric.png', tags: 'laval', score: 10 },
    	    ]);
	    };
		search( { url: '/players/tags/laval' }, response, database );
		page = cheerio.load(response.html);
	});
	
	it('displays two lines + the header', function() {
	    expect(page('#players tr').length).toEqual(2 + 1);
	});
	
	it('displays the score of each player', function() {
	    expect(page.html('#players tr:nth-child(2) td:nth-child(2)')).toContain('20');
	});
    
	it('displays the avatar of each player', function() {
	    expect(page.html('#players tr:nth-child(2) td:nth-child(1)')).toContain('asm.png');
	});
    
});