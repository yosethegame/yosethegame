describe('Object comparaison', function() {
	
	it('considers different objects with different fields', function() {
		expect({ one: 'any' }).not.toEqual({ two: 'any' });
	});
		
	it('considers different objects with same fields and different values', function() {
		expect({ field: 'one' }).not.toEqual({ field: 'two' });
	});
		
	it('considers equal objects with one field and same value', function() {
		expect({ field: 'one' }).toEqual({ field: 'one' });
	});
		
	it('considers equal objects with two fields and same values', function() {
		expect({ one: 'one', two: 'two' }).toEqual({ one: 'one', two: 'two' });
	});
		
	it('considers different objects with two fields and different values', function() {
		expect({ one: 'one', two: 'two' }).not.toEqual({ one: 'one', two: 'not two' });
	});

	it('considers different objects with two fields and same values but different order', function() {
		expect({ one: 'one', two: 'two' }).not.toEqual({ two: 'not two', one: 'one' });
	});
});
