var Requester = require('../../public/level.2/guard.requester');

describe('Power of two Requester', function() {

	var requester;

	beforeEach(function() {
		requester = new Requester('this-url');
	});
	
	it('has a string chooser', function() {
		expect(requester.stringChooser.getString()).toBeDefined();
	});
	
	it('adds the string to the url', function() {
		requester.stringChooser = { getString: function() { return 'yolo'; } };
				
		expect(requester.url()).toEqual('this-url?number=yolo');
	});
		
});