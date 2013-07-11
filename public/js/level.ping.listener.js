LevelPingListener = function() {

	return {								
		
		try: function() {
			self = this;
			var endpoint = "/ping?server=" + $('#server').val();
			$.get(endpoint)
			.done(function(data, textStatus, jqXHR) {
				if (data == LevelPingListener.expectedAnswer) {
					$('#status').text('success!');
				}
				else {
					$('#status').text('fail :(: should return ' + LevelPingListener.expectedAnswer);
				}
			})
			.fail(function(error) {
				$('#status').text('fail :(: server not responding(404)');
			});
		}
	};
};

LevelPingListener.expectedAnswer = JSON.stringify({ alive: true });

var module = module || {};
module.exports = LevelPingListener;