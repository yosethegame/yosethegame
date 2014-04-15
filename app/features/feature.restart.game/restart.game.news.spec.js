var restartgame = require('./lib/restart.game');
var Example = require('../../support/database.with.levels');

describe('When restarting game:', function() {

	var database;

	beforeEach(function() {		
		database = new Example();
		database.news = [];
		database.players = [
			{
				login: 'bilou',
				portfolio: [ { server: 'any', achievements: [1] } ]
			}
		];
		restartgame({ url: '/restart-game?login=bilou' }, { end: function() {} }, database);
	});
	
	it('logs one news', function(done) {
        database.getNews(function(news) {
            expect(news.length).toEqual(1);
            done(); 
        });
    });
    
});