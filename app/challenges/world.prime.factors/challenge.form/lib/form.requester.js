var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
}

Requester.prototype.url = function() {
	return this.server + '/primeFactors/ui';
};

module.exports = Requester;