var logSuccess 	= require('../../public/feature.try/log.success');

describe('Log success,', function() {

	describe('Portfolio', function() {
		
		it('adds the given level id in the portfolio of the player', function() {
			var player = {};
			logSuccess(player, 1);

			expect(player.portfolio[0].achievements[0]).toEqual(1);
		});

		it('pills up the given challenges in the portfolio of the player', function() {
			var player = {};
			logSuccess(player, 1);
			logSuccess(player, 2);

			expect(player.portfolio[0].achievements[1]).toEqual(2);
		});

	});

	describe('Score:', function() {
	
		it('passing the challenge gives you 10 points', function() {
			var player = {};
			logSuccess(player);

			expect(player.score).toEqual(10);
		});
		
		it('passing the second challenge gives you +10 too', function() {
			var player = { score: 10 };
			logSuccess(player);

			expect(player.score).toEqual(20);
		});
	});
	
});