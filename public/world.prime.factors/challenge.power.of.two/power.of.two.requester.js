var Chooser = require('./power.of.two.chooser');

function Requester(server) {
	this.server = server;
	this.numberChooser = new Chooser();
}

Requester.prototype.url = function() {
	return this.server + '/primeFactors?number=' + this.numberChooser.getNumber();
};

var module = module || {};
module.exports = Requester;