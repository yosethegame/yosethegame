function SaveSettings($) {	
    this.page = $;
    selfSettingSaver = this;
}

SaveSettings.prototype.go = function() {
    this.page.post('/save-settings', { login: this.page('#login').text(), avatar: this.page('#avatar-url').val(), tags: this.page('#tags').val() }, this.success );
};

SaveSettings.prototype.success = function() {
    selfSettingSaver.page('#feedback').removeClass('hidden').addClass('visible');
};


var module = module || {};
module.exports = SaveSettings;