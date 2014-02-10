var restartgame = require('./lib/restart.game');
var Example = require('../../support/database.with.levels');

describe('Restart game:', function() {

	var database;

	beforeEach(function() {		
		database = new Example();
	});
	
	describe('When the player has a done a challenge,', function() {
		
		beforeEach(function() {		
			database.players = [
				{
					login: 'bilou',
					portfolio: [ { server: 'any', achievements: [1] } ]
				}
			];
			restartgame({ url: '/restart-game?login=bilou' }, { end: function() {} }, database);
		});

		it('empties the portfolio', function(done) {
			database.find('bilou', function(player) {
				expect(player.portfolio.length).toEqual(0);
				done();
			});
		});

		it('sets score to 0', function(done) {
			database.find('bilou', function(player) {
				expect(player.score).toEqual(0);
				done();
			});
		});
	});
	
	describe('Strength', function() {
	
		it('resists basic attacks', function() {
			restartgame({ url: '/restart-game' }, { end: function() {} }, database);
		});

		it('resists to request made for unknown player', function() {
			restartgame({ url: '/restart-game?login=any' }, { end: function() {} }, database);
		});
	});
});