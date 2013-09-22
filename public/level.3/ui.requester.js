function Requester(server) {
	this.server = server;
};

Requester.prototype.url = function() {
	return this.server + '/primeFactors/ui';
};

var module = module || {};
module.exports = Requester;