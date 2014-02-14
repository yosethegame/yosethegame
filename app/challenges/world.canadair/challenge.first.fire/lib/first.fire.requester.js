var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
	
	this.candidates = [
	    { map: "...P...WF" , width: 3 },
	    { map: "W....P.F." , width: 3 },
	    { map: ".P..F..W." , width: 3 },
	];
	
	this.mapWidth = function() {
	    return this.candidates[this.candidateIndex()].width;
	};
	
	this.map = function() {
	    return this.candidates[this.candidateIndex()].map;
	};
	
	this.candidateIndex = function() {
	    return Math.floor(Math.random() * this.candidates.length);
	};
}

Requester.prototype.url = function() {
	return this.server + '/fire/geek?' + 'width=' + this.mapWidth() + '&map=' + this.map();
};

var module = module || {};
module.exports = Requester;