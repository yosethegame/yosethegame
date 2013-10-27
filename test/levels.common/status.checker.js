var checkThatStatusIs = function(status, result) {
	
	it('sets code to ' + result.code, function() {
		expect(status.code).toEqual(result.code);
	});		
	
	it('sets expected', function() {
		expect(status.expected).toContain(result.expected);
	});
	
	it('sets actual', function() {
		expect(status.got).toEqual(result.got);
	});

};

module.exports = checkThatStatusIs;