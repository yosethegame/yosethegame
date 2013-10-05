var $ = $ || require('jquery');

function CreatePlayerListener() {	
};

CreatePlayerListener.prototype.player = function() {
	$.post('/create-player', { login: $('#login').val(), avatar: $('#avatar').val() } ).done(this.succcess);
};

CreatePlayerListener.prototype.success = function(data) {
	$('#feedback').removeClass('hidden').addClass('visible');
	$('#player-dashboard').attr('href', '/players/' + $('#login').val());
};

var module = module || {};
module.exports = CreatePlayerListener;