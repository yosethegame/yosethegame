var $ = $ || require('jquery');

function SaveSettings() {	
}

SaveSettings.prototype.go = function() {
    $.post('/save-settings', { login: $('#login').text(), avatar: $('#avatar-url').val() } );
};


var module = module || {};
module.exports = SaveSettings;