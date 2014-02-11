var Requester = require('./lib/guard.requester');

describe('Guard string Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('suppresses eventual training slash', function() {
        expect(new Requester('this-url/').server).toEqual('this-url');
	});
	
	it('has a string chooser', function() {
		expect(typeof requester.stringChooser.getString()).toEqual('string');
	});
	
	it('adds the string to the url', function() {
		requester.stringChooser = { getString: function() { return 'yolo'; } };
				
		expect(requester.url()).toEqual('this-url/primeFactors?number=yolo');
	});
		
});