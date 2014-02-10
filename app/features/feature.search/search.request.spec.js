var cheerio = require('cheerio');
var search  = require('./lib/search.request.js');
var InMemoryDatabase = require('../../support/inMemoryDatabase');

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
	
	describe('matching player line', function() {
	    
	    var line;
	    
	    beforeEach(function() {
	       line = page('#players tr:nth-child(2)');
	    });
	    
	    describe('avatar column', function() {
	        
	        var column;
	        
	        beforeEach(function() {
	            column = line.find('td.avatar-column');
	        });
	        
        	it('displays the avatar of the player as the link', function() {
	            expect(column.find('img').attr('src')).toEqual('asm.png'); 
        	});
	        
	    });
	    
    	it('displays the server of the player', function() {
    	    expect(line.find('td.server-column').find('a').attr('href')).toEqual('server of asm');
    	});

    	it('displays the score of the player', function() {
    	    expect(line.find('td.score-column').html()).toContain('20');
    	});

	});

	it('does not display an undefined server', function() {
	    expect(page('#players tr:nth-child(3) td.server-column').html().trim()).toEqual('undefined');
	});

});