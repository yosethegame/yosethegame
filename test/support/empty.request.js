function EmptyRequest(options) {
	this.options = options;
};

EmptyRequest.prototype.url = function() {
	return this.options.query.server;
};

var module = module || {};
module.exports = EmptyRequest;