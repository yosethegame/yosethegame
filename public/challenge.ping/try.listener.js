var $ = $ || require('jquery');

LevelPingListener = function() {

	return _this = {
		
		try: function() {
			_this.clear();
			$.get("/ping?server=" + $('#server').val()).done(_this.success).fail(_this.error);
		},
		
		clear: function() {
			$('#success').text('');
			$('#error').text('');
			$('#expected').text('');
			$('#got').text('');
			$('#success_section').addClass('hidden');
			$('#error_section').addClass('hidden');
		},
		
		success: function(data, textStatus, jqXHR) {
			_this.clear();
			$('#success').text('success!');
			$('#success_section').removeClass('hidden');
			$('#error_section').addClass('hidden');
			
			if ($('#player.visible #login').length > 0) {
				$.post('/success', { 
					challenge: 'public/challenge.ping/ping.html',
					login: $('#login').text(),
					server: $('#server').val()
				});
			}
		},
		
		error: function(err) {
			_this.clear();
			$('#error').text('error ' + err.status );
			$('#error_section').removeClass('hidden');
			$('#success_section').addClass('hidden');
			
			if (err.responseText != null) {
				var gotIndex = err.responseText.indexOf(',"got":');
				var expected = err.responseText.substring('{"expected":}'.length-1, gotIndex);
				var actual = err.responseText.substring(gotIndex + ',"got":'.length);

				$('#expected').text(expected);
				$('#got').text(actual.substring(0, actual.length-1));
			}
		},
		
	};
};

LevelPingListener.expectedAnswer = JSON.stringify({ alive: true });

var module = module || {};
module.exports = LevelPingListener;