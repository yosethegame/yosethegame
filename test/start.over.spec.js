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

		it('empties the portfolio', function() {
			expect(database.find('bilou').portfolio.length).toEqual(0);
		});

		it('empties the server', function() {
			expect(database.find('bilou').server).toBe(undefined);
		});
	});
	
	describe('Strength', function() {
	
		it('resists basic attacks', function() {
			startover({ url: '/start-over' }, { end: function() {} }, database);
		});
	});
});