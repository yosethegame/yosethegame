var self;

CreatePlayerController = function($) {
    self = this;
    this.page = $;
    this.regex = /^[A-z|\.|\-|@|0-9]+$/;
}

CreatePlayerController.prototype.isLoginCorrect = function() {
    return (this.regex).test(this.page('#login').val());
};

CreatePlayerController.prototype.updateLoginFeedback = function() {
    if (this.isLoginCorrect()) {
        this.page('#login-feedback').removeClass('alert-danger').addClass('alert-success');
        this.page('#login-feedback label').text('Login correct');
    }
    else {
        this.page('#login-feedback').removeClass('alert-success').addClass('alert-danger');
        this.page('#login-feedback label').text('Login incorrect. Must match ' + this.regex);
    }
};

CreatePlayerController.prototype.updatePreview = function() {
    this.page('#avatar-preview').attr('src', this.page('#avatar').val());
    this.page.get(this.page('#avatar').val()).success(this.succesGettingAvatar).error(this.errorGettingAvatar);
};

CreatePlayerController.prototype.player = function() {
    var login = this.page('#login').val().replace(/\s/g, '');
    var avatar = this.page('#avatar').val();

    if (this.isLoginCorrect()) {
        this.page.post('/create-player', { login: login, avatar: avatar }, this.success);
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
    self.page('#preview-feedback').removeClass('alert-success').addClass('alert-danger');
    self.page('#preview-feedback label').text('Not an image');
};

CreatePlayerController.prototype.displaySuccess = function() {
    self.page('#preview-feedback').removeClass('alert-danger').addClass('alert-success');
    self.page('#preview-feedback label').text('Image found');
};

CreatePlayerController.prototype.success = function(data) {
	self.page('#feedback').removeClass('hidden').addClass('visible');
	self.page('#player-dashboard').attr('href', '/players/' + self.page('#login').val());
};
