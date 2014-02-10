var $ = $ || require('jquery');

function CreatePlayerController() {
    self = this;	
}

CreatePlayerController.prototype.isLoginCorrect = function() {
    return (/^[A-z|\\.|\\-|@|0-9]+$/).test($('#login').val());
};

CreatePlayerController.prototype.updateLoginFeedback = function() {
    if (this.isLoginCorrect()) {
        $('#login-feedback').removeClass('alert-danger').addClass('alert-success');
        $('#login-feedback label').text('Login correct');
    }
    else {
        $('#login-feedback').removeClass('alert-success').addClass('alert-danger');
        $('#login-feedback label').text('Login incorrect. Must match /^[A-z|\\.|\\-|@|0-9]+$/');
    }
};

CreatePlayerController.prototype.updatePreview = function() {
    $('#avatar-preview').attr('src', $('#avatar').val());
    $.get($('#avatar').val()).success(this.succesGettingAvatar).error(this.errorGettingAvatar);
};

CreatePlayerController.prototype.player = function() {
    var login = $('#login').val().replace(/\s/g, '');
    var avatar = $('#avatar').val();

    if (this.isLoginCorrect()) {
        $.post('/create-player', { login: login, avatar: avatar }, this.success);
    }
};

CreatePlayerController.prototype.succesGettingAvatar = function(data, textStatus, jqXHR) {
    var headers = jqXHR.getAllResponseHeaders();
    var type = headers.indexOf('Content-Type: image');
    if (type === -1) {
        self.displayError();
    } else {
        self.displaySuccess();
    }
};

CreatePlayerController.prototype.errorGettingAvatar = function(jqXHR, textStatus, errorThrown) {
    self.displayError();
};

CreatePlayerController.prototype.displayError = function() {
    $('#preview-feedback').removeClass('alert-success').addClass('alert-danger');
    $('#preview-feedback label').text('Not an image');
};

CreatePlayerController.prototype.displaySuccess = function() {
    $('#preview-feedback').removeClass('alert-danger').addClass('alert-success');
    $('#preview-feedback label').text('Image found');
};

CreatePlayerController.prototype.success = function(data) {
	$('#feedback').removeClass('hidden').addClass('visible');
	$('#player-dashboard').attr('href', '/players/' + $('#login').val());
};

var module = module || {};
module.exports = CreatePlayerController;