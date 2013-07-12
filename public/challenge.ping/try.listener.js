var $ = $ || require('jquery');

LevelPingListener = function() {

	return _this = {
		
		try: function() {
			$.get("/ping?server=" + $('#server').val()).done(_this.success).fail(_this.error);
		},
		
		success: function(data, textStatus, jqXHR) {
			_this.display('success!');
		},
		
		error: function(err) {
			var clue = (err.responseText == '') ? 'server not responding' : err.responseText;
			_this.display(err.status + ': ' + clue);
		},
		
		display: function(message) {
			$('#status').text(message);
		}
	};
};

LevelPingListener.expectedAnswer = JSON.stringify({ alive: true });

var module = module || {};
module.exports = LevelPingListener;