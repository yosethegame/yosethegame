var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
	
	this.candidates = [
        { map: "W..P......W....", width: 5, target: { x:0, y:0 } },
        { map: "....P.....W...W", width: 5, target: { x:4, y:2 } },
        { map: "....P...W...W..", width: 5, target: { x:3, y:1 } },
        { map: "....P....WW....", width: 5, target: { x:4, y:1 } },
        { map: ".W...P........W", width: 5, target: { x:1, y:0 } },
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