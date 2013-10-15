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
	
	describe('Level presence in portfolio', function() {
	
		it('is false when porftfolio is empty', function() {
			expect(thisPlayer.hasDoneThisLevel({ portfolio: [] }, { id: 1 })).toBe(false);
		});
		
		it('is true when portfolio contains the id of the given level', function() {
			expect(thisPlayer.hasDoneThisLevel({ portfolio: [2, 1] }, { id: 1 })).toBe(true);
		});
		
		it('is false when porftfolio does not exist', function() {
			expect(thisPlayer.hasDoneThisLevel({ }, { id: 1 })).toBe(false);
		});
		
	});
});