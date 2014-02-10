var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');
var IntegerChooser = require('../../common/lib/integer.chooser');
var StringChooser = require('../../common/lib/string.chooser');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
	this.numberChooser = new IntegerChooser();
	this.stringChooser = new StringChooser();
}

Requester.prototype.url = function() {
	return this.server + '/primeFactors?' +
							'number=' + this.numberChooser.getNumber() +
							'&number=' + this.numberChooser.getNumber() +
							'&number=' + this.stringChooser.getString()
           ;
};

var module = module || {};
module.exports = Requester;