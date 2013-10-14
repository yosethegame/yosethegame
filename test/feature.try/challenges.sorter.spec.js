var Sorter = require('../../public/feature.try/challenges.sorter');

describe('Challenges utils >', function() {

	var database;
	
	beforeEach(function() {
		database = { worlds: [
			{
				levels : [
					{ id: 1 },
					{ id: 2 },
					{ id: 3 },
				]
			}]
		};
	});
	
	describe('Sorting challenges:', function(){

		var sorter;
		
		beforeEach(function() {
			sorter = new Sorter();
		});
	
		it('does not modify an already sorted array', function() {
			var items = [
				{ item: { id: 1 }, world: database.worlds[0] },
				{ item: { id: 2 }, world: database.worlds[0] },		
			]
			items.sort(sorter.sort);
			
			expect(items[0].item.id).toEqual(1);
		});
		
		it('does invert two challenges in incorrect order', function() {
			var items = [
				{ item: { id: 2 }, world: database.worlds[0] },		
				{ item: { id: 1 }, world: database.worlds[0] },
			]
			items.sort(sorter.sort);
			
			expect(items[0].item.id).toEqual(1);
		});
		
		describe('Index lookup by id of level in world', function() {					
		
			it('knows the index of first level is 0', function() {
				expect(Sorter.indexOf({ item: { id: database.worlds[0].levels[0].id }, world: database.worlds[0] })).toEqual(0);
			});
			
			it('knows the index of second level is 1', function() {
				expect(Sorter.indexOf({ item: { id: database.worlds[0].levels[1].id }, world: database.worlds[0] })).toEqual(1);
			});	
			
		});
	});
});