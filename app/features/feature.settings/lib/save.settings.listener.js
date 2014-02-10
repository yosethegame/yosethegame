var $ = $ || require('jquery');

function SaveSettings() {	
}

SaveSettings.prototype.go = function() {
    $.post('/save-settings', { login: $('#login').text(), avatar: $('#avatar-url').val(), tags: $('#tags').val() }, this.success );
};

SaveSettings.prototype.success = function() {
    $('#feedback').removeClass('hidden').addClass('visible');
};


var module = module || {};
module.exports = SaveSettings;