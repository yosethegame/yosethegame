var progress = require('../public/js/progress');
var InMemoryDatabase = require('../public/js/inMemoryDatabase');

describe('Progress percentage', function() {

	var database;
	var player;
	
	beforeEach(function() {	
		database = new InMemoryDatabase();
		database.challenges = [
			{ title: 'First challenge' },
			{ title: 'Second challenge' }
		];
	});
	
	it('is 0% when the player has an empty portfolio', function() {
		player = {
			portfolio : []
		}
		expect(progressOf(player, database)).toEqual(0);
	});
	
	it('is 0% when the player has no portfolio', function() {
		player = {
		}
		expect(progressOf(player, database)).toEqual(0);
	});
	
	it('is 50% when the player has done half of the available challenges', function() {
		player = {
			portfolio: [
				{ 
					title: 'First challenge'
				}
			]
		};
		expect(progressOf(player, database)).toEqual(50);
	});
	
	it('is not oversized when the player has done several times the same challenge', function() {
		player = {
			portfolio: [
				{ 
					title: 'First challenge'
				},
				{ 
					title: 'First challenge'
				}
			]
		};
		expect(progressOf(player, database)).toEqual(50);
	});
	it('is 100% when the player has done all the available challenges', function() {
		player = {
			portfolio: [
				{ 
					title: 'First challenge'
				},
				{ 
					title: 'Second challenge'
				}
			]
		};
		expect(progressOf(player, database)).toEqual(100);
	});
	
	it('is 100% when the player has done all the available challenges, even several times', function() {
		player = {
			portfolio: [
				{ 
					title: 'First challenge'
				},
				{ 
					title: 'First challenge'
				},
				{ 
					title: 'Second challenge'
				}
			]
		};
		expect(progressOf(player, database)).toEqual(100);
	});
	
	it('is rounded', function() {
		database.challenges = [
			{ title: 'First challenge' },
			{ title: 'Second challenge' },
			{ title: 'Third challenge' }
		];
		player = {
			portfolio: [
				{ 
					title: 'First challenge'
				}
			]
		};
		expect(progressOf(player, database)).toEqual(33);
	});
	
});