var thisPlayer  = require('./lib/player.utils');
var Example		= require('./support/database.with.levels');

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
			expect(thisPlayer.hasDoneThisLevel({ portfolio: [ { achievements: [2, 1] }] }, { id: 1 })).toBe(true);
		});
		
		it('is false when porftfolio does not exist', function() {
			expect(thisPlayer.hasDoneThisLevel({ }, { id: 1 })).toBe(false);
		});
		
	});
	
	describe('Level presence by id in portfolio', function() {

		it('is false when porftfolio is empty', function() {
			expect(thisPlayer.hasDoneLevelWithId({ portfolio: [] }, 1)).toBe(false);
		});
		
		it('is true when portfolio contains the id of the given level', function() {
			expect(thisPlayer.hasDoneLevelWithId({ portfolio: [ { achievements: [2, 1] }] }, 1)).toBe(true);
		});
		
		it('is false when porftfolio does not exist', function() {
			expect(thisPlayer.hasDoneLevelWithId({ }, 1)).toBe(false);
		});
		
	});
	
	describe('Level presence by sevelral ids in portfolio', function() {

        it('is false when the player has done no challenge', function() {
            expect(thisPlayer.hasDoneOneOfThoseLevelsWithId({ }, [1])).toBe(false);
        }); 

        it('is true when the player has done one of the given challenges', function() {
            expect(thisPlayer.hasDoneOneOfThoseLevelsWithId({ portfolio: [ { achievements: [2, 1] }] }, [1, 3])).toBe(true);
        });
	});
});