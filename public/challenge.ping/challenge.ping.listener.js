var $ = $ || require('jquery');

LevelPingListener = function() {

	return _this = {
		
		try: function() {
			$.get("/ping?server=" + $('#server').val()).done(_this.success).fail(_this.error);
		},
		
		success: function(data, textStatus, jqXHR) {
			if (data == LevelPingListener.expectedAnswer) {
				_this.display('success!');
			}
			else {
				_this.display('fail :(: should return ' + LevelPingListener.expectedAnswer);
			}
		},
		
		error: function(err) {
			_this.display('fail :(: server not responding(404)');
		},
		
		display: function(message) {
			$('#status').text(message);
		}
	};
};

LevelPingListener.expectedAnswer = JSON.stringify({ alive: true });

var module = module || {};
module.exports = LevelPingListener;