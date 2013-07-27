var servecontent = require('./serve-content.js');
var pong         = require('../challenge.ping/pong.js');
var Dashboard	 = require('./dashboard.js');

String.prototype.startsWith = function (prefix) {
	return this.indexOf(prefix) == 0;
}

serving = function(folder) {
	
	return function (request, response) {
		if (request.url.startsWith('/ping?server=')) {
			pong(request, response);
		}
		else if (request.url.startsWith('/players/ericminio')) {
			var dashboard = new Dashboard('ericminio');
			dashboard.display(request, response);
		}
		else {
			servecontent(folder, request, response);
		}
	};
};

module.exports = serving;
