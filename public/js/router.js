var servecontent = require('./serve-content.js');
var pong         = require('../challenge.ping/pong.js');
var dashboard	 = require('./dashboard.js');
var success		 = require('./success.js');

String.prototype.startsWith = function (prefix) {
	return this.indexOf(prefix) == 0;
}

Router = function() {
	
	return _thisRouter = {
		
		routes: [
			{
				prefix: '/ping',
				target: pong
			},
			{
				prefix: '/players/',
				target: dashboard
			},
			{
				prefix: '/success',
				target: success
			},
			{
				prefix: '/tryPowerOfTwo',
				target: require('../challenge.primeFactors/power.of.two.js')
			},
			{
				prefix: '',
				target: servecontent('public')
			}
		],
		
		gate: function(request, response) {
			_thisRouter.endPointOf(request)(request, response, _thisRouter.repository);
		},

		endPointOf: function(request) {
			for (i=0; i<_thisRouter.routes.length; i++) {
				if (request.url.startsWith(_thisRouter.routes[i].prefix)) {
					return _thisRouter.routes[i].target;
				}
			}
		},
		
		useRepository: function(repository) {
			_thisRouter.repository = repository;
		}
	};
};

module.exports = Router;
