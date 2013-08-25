require('../public/js/string-extensions');
require('../public/js/array-extensions');

describe('School', function() {

	describe('url manipulation', function() {
	
		it('can extracts segments', function() {
			var url = '/players/xorg';
			expect(url.lastSegment()).toEqual('xorg');
		});
	});
	
	describe('forEach', function() {
	
		it('can iterate through a collection', function() {
			var sum = 0;						
			[1, 2, 3].forEachItem(function(item) {
				sum += item;
			});
			expect(sum).toEqual(6);
		});
		
		it('can extract one item from a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var ten;
			[mouse, keyboard].forEachItem(function(item) {
				if (item.price == 10) {
					ten = item;
				}
			});
			
			expect(ten).toEqual(mouse);
		});
		
	});
	
	describe('Select', function() {

		it('can select one item from a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var ten = [mouse, keyboard].select(function(item) {
				return item.price == 10;
			});
			
			expect(ten).toEqual(mouse);
		});
		
	});
	
});