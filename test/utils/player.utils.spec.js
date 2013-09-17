var thisPlayer 	= require('../../public/js/utils/player.utils');
var Example		= require('../support/database.with.levels');

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
	
	describe('Current level', function() {
		var database;
		var player;
		
		beforeEach(function() {
			database = new Example();
			database.players = [player];
		});
		
		it('is level 1 when portfolio is empty', function() {
			player = { };			
			
			expect(thisPlayer.currentLevel(player, database).number).toEqual(1);		
		});
		
		it('is level 1 when player has not finished level 1', function() {
			player = { 
				portfolio: [ { title: 'challenge 1.1' } ]
			};			
			
			expect(thisPlayer.currentLevel(player, database).number).toEqual(1);
		});

		it('is level 2 when player has finished level 1', function() {
			player = { 
				portfolio: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' } ]
			};			
			
			expect(thisPlayer.currentLevel(player, database).number).toEqual(2);
		});

		it('is level 2 when player has finished level 2 and there is no level 3', function() {
			player = { 
				portfolio: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' }, { title: 'challenge 2.1' }, { title: 'challenge 2.2' } ]
			};			
			
			expect(thisPlayer.currentLevel(player, database).number).toEqual(2);
		});
	});
	
	
	describe('Next challenge', function() {

		var database;
		var player;
		
		beforeEach(function() {
			database = new Example();
			database.players = [player];
		});
		
		it('is first challenge when portfolio is empty', function() {
			player = { };			
			
			expect(thisPlayer.nextChallenge(player, database).title).toEqual('challenge 1.1');		
		});
		
		it('is second challenge when player has not finished level 1', function() {
			player = { 
				portfolio: [ { title: 'challenge 1.1' } ]
			};			
			
			expect(thisPlayer.nextChallenge(player, database).title).toEqual('challenge 1.2');
		});

		it('is first challenge of level 2 when player has finished level 1', function() {
			player = { 
				portfolio: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' } ]
			};			
			
			expect(thisPlayer.nextChallenge(player, database).title).toEqual('challenge 2.1');
		});
		
		it('is undefined when player has finished level 2 and there is no level 3', function() {
			player = { 
				portfolio: [ { title: 'challenge 1.1' }, { title: 'challenge 1.2' }, { title: 'challenge 2.1' }, { title: 'challenge 2.2' } ]
			};			
			
			expect(thisPlayer.nextChallenge(player, database)).toBe(undefined);
		});
	});
});