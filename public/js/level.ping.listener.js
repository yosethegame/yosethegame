LevelPingListener = function() {
	expectedAnswer = JSON.stringify({ alive: true });
	
	return {						

		try: function() {
			var endpoint = "/ping?server=" + $('#server').val();
			$.get(endpoint)
			.done(function(data, textStatus, jqXHR) {
				if (data == expectedAnswer) {
					$('#status').text('success!');
				}
				else {
					$('#status').text('fail :(: should return ' + expectedAnswer);
				}
			})
			.fail(function(error) {
				$('#status').text('fail :(: server not responding(404)');
			});
		}
	};
}
