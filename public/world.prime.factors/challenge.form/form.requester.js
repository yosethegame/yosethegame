var removeTrailingSlashOf = require('../../levels.common/remove.trailing.slash');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
}

Requester.prototype.url = function() {
	return this.server + '/primeFactors/ui';
};

var module = module || {};
module.exports = Requester;