var thisPlayer 	= require('../../public/js/utils/player.utils');
var Example		= require('../support/database.with.levels');

describe('Player utils:', function() {

	describe('Current score', function() {
	
		it('is zero when score is not defined', function() {
			expect(thisPlayer.scoreOf({})).toEqual(0);
		});
		
		it('is the score of the player if defined', function() {
			expect(thisPlayer.scoreOf({ score: 420 })).toEqual(420);
		});
		
	});
});