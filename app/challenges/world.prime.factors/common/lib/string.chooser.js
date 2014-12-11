function Chooser() {
	
	this.getString = function() {
		var index = Math.floor(Math.random()*10);
		return [
			'yolo', 
			'hello', 
			'world', 
			'geek', 
			'javascript', 
			'prime', 
			'factors', 
			'optimus', 
			'batman', 
			'surfer'
		][index];
	};
	
}

module.exports = Chooser;