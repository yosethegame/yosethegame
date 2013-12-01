var $ = $ || require('jquery');

function CreatePlayerListener() {
    self = this;	
}

CreatePlayerListener.prototype.updatePreview = function() {
    $('#avatar-preview').attr('src', $('#avatar').val());
    $.get($('#avatar').val()).success(this.succesGettingAvatar).error(this.errorGettingAvatar);
};

CreatePlayerListener.prototype.player = function() {
    var login = $('#login').val().replace(/\s/g, '');
    var avatar = $('#avatar').val();

	$.post('/create-player', { login: login, avatar: avatar }, this.success);
};

CreatePlayerListener.prototype.succesGettingAvatar = function(data, textStatus, jqXHR) {
    var headers = jqXHR.getAllResponseHeaders();
    var type = headers.indexOf('Content-Type: image');
    if (type === -1) {
        self.displayError();
    } else {
        self.displaySuccess();
    }
};

CreatePlayerListener.prototype.errorGettingAvatar = function(jqXHR, textStatus, errorThrown) {
    self.displayError();
};

CreatePlayerListener.prototype.displayError = function() {
    $('#preview-feedback').removeClass('alert-success').addClass('alert-danger');
    $('#preview-feedback label').text('Not an image');
};

CreatePlayerListener.prototype.displaySuccess = function() {
    $('#preview-feedback').removeClass('alert-danger').addClass('alert-success');
    $('#preview-feedback label').text('Image found');
};

CreatePlayerListener.prototype.success = function(data) {
	$('#feedback').removeClass('hidden').addClass('visible');
	$('#player-dashboard').attr('href', '/players/' + $('#login').val());
};

var module = module || {};
module.exports = CreatePlayerListener;