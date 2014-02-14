module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		callback({
			code: 501,
			expected: 'to be defined',
			got: 'to be defined',
		});
	}
};