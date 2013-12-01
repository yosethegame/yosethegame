var $ = $ || require('jquery');

function CreatePlayerListener() {	
}

CreatePlayerListener.prototype.player = function() {
    var login = $('#login').val().replace(/\s/g, '');
	$.post('/create-player', { login: login, avatar: $('#avatar').val() }, this.success);
};

CreatePlayerListener.prototype.success = function(data) {
	$('#feedback').removeClass('hidden').addClass('visible');
	$('#player-dashboard').attr('href', '/players/' + $('#login').val());
};

var module = module || {};
module.exports = CreatePlayerListener;