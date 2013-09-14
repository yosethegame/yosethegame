var startover = require('../public/js/start.over');
var InMemoryDatabase = require('./support/inMemoryDatabase');

describe('Start over:', function() {

	var database;

	beforeEach(function() {		
		database = new InMemoryDatabase();
	});
	
	describe('When the player has a portfolio,', function() {
		
		beforeEach(function() {		
			database.players = [
				{
					login: 'bilou',
					server: 'guiguilove',
					portfolio: [
						{
							title: 'thisTitle'
						}
					]
				}
			];
			startover({ url: '/start-over?login=bilou' }, { end: function() {} }, database);
		});

		it('empties the portfolio', function(done) {
			database.find('bilou', function(player) {
				expect(player.portfolio.length).toEqual(0);
				done();
			});
		});

		it('empties the server', function(done) {
			database.find('bilou', function(player) {
				expect(player.server).toBe(undefined);
				done();
			});
		});
	});
	
	describe('Strength', function() {
	
		it('resists basic attacks', function() {
			startover({ url: '/start-over' }, { end: function() {} }, database);
		});

		it('resists to request made for unknown player', function() {
			startover({ url: '/start-over?login=any' }, { end: function() {} }, database);
		});
	});
});