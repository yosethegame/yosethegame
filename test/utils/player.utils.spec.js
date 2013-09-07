var thisPlayer = require('../../public/js/utils/player.utils');

describe('Player utils:', function() {

	describe('Can check whether the portfolio contains a given challenge', function() {
				
		it('An undefined portfolio contains nothing', function() {
			expect(thisPlayer.hasTheGivenChallengeInPortfolio('title', {})).toBe(false);
		});

		it('An empty portfolio contains nothing', function() {
			expect(thisPlayer.hasTheGivenChallengeInPortfolio('title', { portfolio : [] })).toBe(false);
		});
		
		it('returns false when the portfolio does not contain the given challenge', function() {
			expect(thisPlayer.hasTheGivenChallengeInPortfolio('hello', { portfolio : [
					{
						title: 'one'
					}
				] })).toBe(false);
		});

		it('returns true when the portfolio does contain the given challenge', function() {
			expect(thisPlayer.hasTheGivenChallengeInPortfolio('hello', { portfolio : [
					{
						title: 'hello'
					}
				] })).toBe(true);
		});
	});
	
});