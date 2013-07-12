var servecontent = require('./serve-content.js');
var pong         = require('../challenge.ping/pong.js');

String.prototype.startsWith = function (prefix) {
	return this.indexOf(prefix) == 0;
}

serving = function(folder) {
	
	return function (request, response) {
		if (request.url.startsWith('/ping')) {
			pong(request, response);
		}
		else {
			servecontent(folder, request, response);
		}
	};
};

module.exports = serving;
