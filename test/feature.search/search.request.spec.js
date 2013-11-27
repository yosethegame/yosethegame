var cheerio = require('cheerio');
var search  = require('../../public/feature.search/search.request.js');

describe('Search', function() {
  
  	var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	};
	var database = {};
	var page;
	
	beforeEach(function() {	
	    database.players = [ 
	        { login: 'ericminio', tags: 'laval' },
	        { login: 'annessou', tags: 'laval' }, 
	    ];
		search( { url: '/players/tags/laval' }, response, database );
		page = cheerio.load(response.html);
	});
	
	it('displays two lines', function() {
	    expect(page('#players tr').length).toEqual(2);
	});
    
});