var logServer = require('./lib/log.server');

describe('Log server,', function() {
	
	it('stores the given server in the first element of the portfolio', function() {
		var player = {};
		logServer(player, 'any');
		
		expect(player.portfolio[0].server).toEqual('any');
	});
	
	it('overwrites any existing value', function() {
		var player = {};
		logServer(player, 'one');
		logServer(player, 'two');
		
		expect(player.portfolio[0].server).toEqual('two');
	});
	
});
