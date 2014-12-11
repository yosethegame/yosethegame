var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');
var translateIntoRoman = require('./translate.into.roman');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
}

Requester.prototype.url = function() {
	return this.server + '/primeFactors?number=' + translateIntoRoman(this.chooseNumber());
};

Requester.prototype.chooseNumber = function() {
    return Math.floor(Math.random()*399) + 1;
};

module.exports = Requester;