function Chooser() {
	
	this.getNumber = function() {
		return Math.floor(Math.random()*10000) + 2;
	};
	
}

module.exports = Chooser;