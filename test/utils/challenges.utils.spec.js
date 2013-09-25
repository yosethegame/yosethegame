var Sorter = require('../../public/js/utils/challenges.utils');

describe('Challenges utils >', function() {

	var database;
	
	beforeEach(function() {
		database = {
			levels: [
				{ challenges: [ { title: '1.1' }, { title: '1.2' } ] },
				{ challenges: [ { title: '2.1' }, { title: '2.2' } ] }
			]
		};
	});
	
	describe('Sorting challenges:', function(){

		var sorter;
		
		beforeEach(function() {
			sorter = new Sorter();
		});
	
		it('does not modify an already sorted array', function() {
			var challenges = [
				{ item: { challenge: '1.1' }, database: database },
				{ item: { challenge: '1.2' }, database: database },		
			]
			challenges.sort(sorter.sort);
			
			expect(challenges[0].item.challenge).toEqual('1.1');
		});
		
		it('does invert two challenges in incorrect order', function() {
			var challenges = [
				{ item: { challenge: '1.2' }, database: database },		
				{ item: { challenge: '1.1' }, database: database },
			]
			challenges.sort(sorter.sort);
			
			expect(challenges[0].item.challenge).toEqual('1.1');
		});
		
		describe('Index lookup of challenges in database', function() {					
		
			it('knows the index of first challenge is 0', function() {
				expect(Sorter.indexOf({ item: { challenge: '1.1' }, database: database })).toEqual(0);
			});
			
			it('knows the index of second challenge is 1', function() {
				expect(Sorter.indexOf({ item: { challenge: '1.2' }, database: database })).toEqual(1);
			});	
			
			it('knows the index of first challenge of second level', function() {
				expect(Sorter.indexOf({ item: { challenge: '2.1' }, database: database })).toEqual(2);
			});		
		});
	});
});