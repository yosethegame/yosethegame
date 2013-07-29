require('../public/js/string-extensions');

describe('School', function() {

	describe('url manipulation', function() {
	
		it('can extracts segments', function() {
			var url = '/players/xorg';
			expect(url.lastSegment()).toEqual('xorg');
		});
	});
	
});