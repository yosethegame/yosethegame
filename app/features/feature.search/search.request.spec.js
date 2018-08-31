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
                { login: 'max',  avatar: 'max.png',  tags: 'laval' , score: 20 , portfolio: [ { server: 'server of max' }]}, 
                { login: 'ericminio', avatar: 'eric.png', tags: 'laval' , score: 10 },
            ]);
        };
		search( { url: '/players/search/laval' }, response, database );
		page = cheerio.load(response.html);
	});
	
	it('updates the number of matching players', function() {
        expect(page.html()).toContain('2 matching players');
	});
    
	it('displays two lines + the header', function() {
        expect(page('#players .player').length).toEqual(2);
	});
	
	describe('matching player line', function() {

        var line;

        beforeEach(function() {
            line = page('#players .player:nth-child(1)');
        });

        describe('avatar column', function() {
    
            var column;

            beforeEach(function() {
                column = line.find('.avatar-column');
            });

            it('displays the avatar of the player as the link', function() {
                expect(column.find('img').attr('src')).toEqual('max.png'); 
            });

        });

        it('displays the server of the player', function() {
            expect(line.find('.server-column').find('a').attr('href')).toEqual('server of max');
        });

        it('displays the score of the player', function() {
            expect(line.find('.score-column').html()).toContain('20');
        });

	});

	it('does not display an undefined server', function() {
        expect(page('#players .player:nth-child(2) td.server-column').html().trim()).toEqual('undefined');
	});

});