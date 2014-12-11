function Chooser() {
	
	this.getNumber = function() {
		return 1e6 + Math.floor(Math.random()*10000) + 1;
	};
	
}

module.exports = Chooser;