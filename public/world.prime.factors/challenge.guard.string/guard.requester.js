var StringChooser = require('../../levels.common/string.chooser');

function Requester(server) {
	this.server = server;
	this.stringChooser = new StringChooser();
};

Requester.prototype.url = function() {
	return this.server + '/primeFactors?number=' + this.stringChooser.getString();
}

var module = module || {};
module.exports = Requester;