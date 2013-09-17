var startover = require('../public/js/start.over');
var Example = require('./support/database.with.levels');

describe('Start over:', function() {

	var database;

	beforeEach(function() {		
		database = new Example();
	});
	
	describe('When the player has a done the first challenge of the first level,', function() {
		
		beforeEach(function() {		
			database.players = [
				{
					login: 'bilou',
					server: 'guiguilove',
					portfolio: [ { title: 'challenge 1.1' } ]
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
	
	describe('When the player has a done the first challenge of the second level,', function() {
		
		beforeEach(function() {		
			database.players = [
				{
					login: 'bilou',
					server: 'guiguilove',
					portfolio: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' }, { title: 'challenge 2.1' } ]
				}
			];
			startover({ url: '/start-over?login=bilou' }, { end: function() {} }, database);
		});

		it('does not modify the server', function() {
			expect(database.find('bilou').server).toBe('guiguilove');
		});

		it('removes only the first challenge of second level from portfolio', function() {
			expect(database.find('bilou').portfolio.length).toEqual(2);
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