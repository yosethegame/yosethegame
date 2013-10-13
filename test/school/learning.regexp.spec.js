describe('Regexp', function() {

	describe('matching beginning of a string', function() {
	
		var pattern = /^players/;		
	
		it('passes with a matching string', function() {
			expect(pattern.test('players')).toBe(true);
		});
		
		it('fails with a non-matching string', function() {
			expect(pattern.test('the players')).toBe(false);
		});
	});
	
	describe('matching /players', function() {
		
		var pattern = /^\/players/;		
	
		it('passes with a matching string', function() {
			expect(pattern.test('/players')).toBe(true);
		});
		
		it('fails with a non-matching string', function() {
			expect(pattern.test('/the players')).toBe(false);
		});

	});
	
	describe('matching /players/{login}', function() {
		
		var pattern = /^\/players\/[A-z]+$/;
	
		it('passes with a matching string', function() {
			expect(pattern.test('/players/any')).toBe(true);
		});
		
		it('fails with a non-matching string', function() {
			expect(pattern.test('/players/any/thing')).toBe(false);
		});

	});
	
	describe('matching /players/{login}/play/world/{id}', function() {
		
		var pattern = /^\/players\/[A-z]+\/play\/world\/[0-9]+$/;
	
		it('passes with a matching string', function() {
			expect(pattern.test('/players/any/play/world/42')).toBe(true);
		});
		
		it('fails with a non-matching string', function() {
			expect(pattern.test('/players/any/play/world/3/any')).toBe(false);
		});

	});

	describe('matching /any-route', function() {
		
		var pattern = /^\/any-route$/;
	
		it('passes with a matching string', function() {
			expect(pattern.test('/any-route')).toBe(true);
		});
		
		it('fails with a non-matching string', function() {
			expect(pattern.test('/any-route/more')).toBe(false);
		});

	});

	describe('matching *', function() {
		
		var pattern = /.*/;
	
		it('passes with a matching string', function() {
			expect(pattern.test('/-42any/thing')).toBe(true);
		});
		
	});
	
	describe('Data extraction', function() {
		
		var pattern = /^\/players\/(.*)\/play\/world\/(.*)/;
	
		it('is built-in', function() {
			expect(pattern.exec('/players/ericminio/play/world/1')[1]).toEqual('ericminio');
		});
		
		it('can handle multiple parameters', function() {
			expect(pattern.exec('/players/ericminio/play/world/42')[2]).toEqual('42');
		});
		
		it('returns null when not found', function() {
			expect(pattern.exec('/non/matching')).toEqual(null);
		});
	});
});