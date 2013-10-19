function Requester(server) {
	this.server = server;
};

Requester.prototype.url = function() {
	return this.server;
};

var module = module || {};
module.exports = Requester;