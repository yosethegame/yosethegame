var feature = require('./lib/create.player.request');
var fs		= require('fs');

describe('Create Player feature', function() {
	
	it('uses create player form', function() {
		expect(feature.formfile).toEqual('./app/features/feature.create.player/lib/create.player.form.html');
	});
	
	it('sends the form file content in the response and closes the response', function() {
		var content = 'any form';
		fs.writeFileSync('test-data/create-player-form', content);
		feature.formfile = 'test-data/create-player-form';
		var response = {
			write: function(data) {},
			end: function() {}
		};
		spyOn(response, 'write');
		feature({}, response, {});
		
		expect(response.write).toHaveBeenCalledWith(content);
	});
	
	it('closes the response', function() {
		var response = {
			write: function(data) {},
			end: function() {}
		};
		spyOn(response, 'end');
		feature({}, response, {});
		
		expect(response.end).toHaveBeenCalled();
	});
	
});