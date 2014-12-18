module.exports = {

	equalsTo: function(value) {
		return function(item) {
			return item == value;
		};
	}
};