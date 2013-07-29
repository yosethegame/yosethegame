var Router = require('../public/js/router.js');

describe('Router', function() {

	var router = new Router();
	
	describe('Prod configuration:', function() {
	
		var pong   		 = require('../public/challenge.ping/pong.js');
		var dashboard	 = require('../public/js/dashboard.js');
		var servecontent = require('../public/js/serve-content.js');

		it('has routes', function() {
			expect(router.routes.length).toBeGreaterThan(1);
		});

		it('maps ping challenge request', function() {
			expect(router.endPointOf({ url: '/ping?server=any' })).toBe(pong);
		});
		
		it('maps dashboard request', function() {
			expect(router.endPointOf({ url: '/players/any' })).toBe(dashboard);
		});
		
		xit('maps static content request', function() {
			expect(router.endPointOf({ url: '/anything-else' })).toBe(servecontent('public'));
		});
		
	});
	
	describe('Node.js compatibility:', function() {
		
		var server;
		
		beforeEach(function() {
			server = require('http').createServer(router.gate).listen(5000, 'localhost');					
		});
		
		afterEach(function() {
			server.close();
		});
		
		it('routes as expected', function(done) {
			var called = false;
			router.routes = [ 
				{ 
					prefix: '/a-specific-request', 
					target: function(request, response) { 
						called = true; 
						response.end();
					}
				} 
			];

			require('request')("http://localhost:5000/a-specific-request", function(error, response, body) {
				expect(called).toBe(true);
				done();
			});
		})
	});
	
});