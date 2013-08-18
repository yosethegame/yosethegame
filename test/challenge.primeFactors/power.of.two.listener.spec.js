var PowerOfTwoListener = require('../../public/challenge.primeFactors/power.of.two.listener.js');
var $ = require('jquery');

describe("PowerOfTwoListener: ", function() {

	var powerOfTwolistener = new PowerOfTwoListener();
	
	it("send a get request to the chosen server", function() {
		$('<input id="server" />').appendTo('body');
		$('#server').val('any');
		spyOn($, 'get').andCallThrough();
		powerOfTwolistener.try();
		
		expect($.get).toHaveBeenCalledWith('/tryPowerOfTwo?server=any');
	});
	
});