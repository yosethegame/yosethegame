var restartgame = require('../public/js/restart.game');
var Example = require('./support/database.with.levels');

describe('Start over:', function() {

	var database;

	beforeEach(function() {		
		database = new Example();
	});
	
	describe('When the player has a done a challenge,', function() {
		
		beforeEach(function() {		
			database.players = [
				{
					login: 'bilou',
					server: 'guiguilove',
					portfolio: [ { title: 'challenge 1.1' } ]
				}
			];
			restartgame({ url: '/restart-game?login=bilou' }, { end: function() {} }, database);
		});

		it('empties the portfolio', function() {
			expect(database.find('bilou').portfolio.length).toEqual(0);
		});

		it('empties the server', function() {
			expect(database.find('bilou').server).toBe(undefined);
		});
	});
	
	describe('Strength', function() {
	
		it('resists basic attacks', function() {
			startover({ url: '/restart-game' }, { end: function() {} }, database);
		});

		it('resists to request made for unknown player', function() {
			startover({ url: '/restart-game?login=any' }, { end: function() {} }, database);
		});
	});
});