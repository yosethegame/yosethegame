require('../public/js/string-extensions');
var $ = require('jquery');
var array = require('../public/js/array.utils');
var extract = require('../public/js/array.utils');

describe('School', function() {

	describe('url manipulation', function() {
	
		it('can extracts segments', function() {
			var url = '/players/xorg';
			expect(url.lastSegment()).toEqual('xorg');
		});
	});
	
	describe('Arrays', function() {

		it('can detect an array', function() {
			expect(Array.isArray([])).toBe(true);
		});
		
		it('can build an array from string', function() {
			var player = $.parseJSON('{ "table" : [1, 2] }');
			expect(Array.isArray(player.table)).toBe(true);
		});
		
		it("don't have the extensions when built from a string", function() {
			var player = $.parseJSON('{ "table" : [1, 2] }');
			expect(player.table.select).toBe(undefined);	
		});
	});
	
	describe('array.foreach', function() {
		
		it('can iterate through a collection', function() {
			var sum = 0;						
			array.forEach([1, 2, 3], function(item) {
				sum += item;
			});
			expect(sum).toEqual(6);
		});
		
		it('can extract one item from a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var ten;
			array.forEach([mouse, keyboard], function(item) {
				if (item.price == 10) {
					ten = item;
				}
			});
			
			expect(ten).toEqual(mouse);
		});
	});
	
	describe('array.first', function() {

		it('can select one item from a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var ten = array.first([mouse, keyboard], function(item) {
				return item.price == 10;
			});
			
			expect(ten).toEqual(mouse);
		});
		
	});
	
	describe('array.hasOneItemIn', function() {

		it('identify when an item is in a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var found = array.hasOneItemIn([mouse, keyboard], function(item) {
				return item.price == 10;
			});
			
			expect(found).toBe(true);
		});
		
		it('identify when an item is not in a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var found = array.hasOneItemIn([mouse, keyboard], function(item) {
				return item.price == 20;
			});
			
			expect(found).toBe(false);
		});
	});
	
	describe('array()', function() {
		
		var withPrice = function(price) {
			return function(item) {
				return item.price == price;
			}
		};
		
		it('can select one item from a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var ten = extract.firstItemIn([mouse, keyboard], withPrice(10));
			
			expect(ten).toEqual(mouse);
		});
		
	});
});