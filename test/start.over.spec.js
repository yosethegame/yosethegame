var $ = require('jquery');
var Start = require('../public/js/start.over');

describe("Start-Over: ", function() {

	var start = new Start();
	
	beforeEach(function() {
		$('body').append('<label id="login">eric</label>');
	});
	
	afterEach(function() {
		$('#login').remove();
	});
	
	describe('Request sent:', function() {
	
		it("send a get request to the chosen server", function() {
			spyOn($, 'get').andCallThrough();
			start.over();

			expect($.get).toHaveBeenCalledWith('/start-over?login=eric');
		});
	});
});