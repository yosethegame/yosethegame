module.exports = {

	validate: function(url, remoteResponse, content, callback) {
		callback({
			code: 501,
			expected: 'To be defined',
			got: '404',
		});
	}
};