module.exports = {
	isNotUnAuthorized: function(host) {
		return host != 'localhost:5000' && host != 'yose.herokuapp.com';
	}
}