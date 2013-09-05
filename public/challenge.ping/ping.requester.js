function Requester(options) {
	this.options = options;
};

Requester.prototype.url = function() {
	return this.options.query.server;
};

var module = module || {};
module.exports = Requester;