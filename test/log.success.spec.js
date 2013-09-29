var logSuccess 		= require('../public/js/log.success');
var InMemoryDatabase	= require('./support/inMemoryDatabase');

describe('Log success,', function() {

	var database;
	
	beforeEach(function() {
		database = new InMemoryDatabase();
	});

	describe('Portfolio', function() {
		
		it('adds the given challenge in the portfolio of the player', function() {
			var player = {};
			logSuccess(player, 'challenge', database);

			expect(player.portfolio[0].title).toEqual('challenge');
		});

		it('pills up the given challenges in the portfolio of the player', function() {
			var player = {};
			logSuccess(player, 'one', database);
			logSuccess(player, 'two', database);

			expect(player.portfolio[1].title).toEqual('two');
		});

	});

	describe('Score:', function() {
	
		beforeEach(function() {
			database.levels = [
				{ challenges: [ { title: '1.1' }, { title: '1.2' }, { title: '1.3' } ] },
				{ challenges: [ { title: '2.1' }, { title: '2.2' }, { title: '2.3' } ] }
			];
		});
		
		it('passing the challenge gives you 10 points', function() {
			var player = {};
			logSuccess(player, { title: '1.1' }, database);

			expect(player.score).toEqual(10);
		});
		
		it('passing the second challenge gives you +10 too', function() {
			var player = { score: 10 };
			logSuccess(player, { title: '1.2' }, database);

			expect(player.score).toEqual(20);
		});
	});
	
});