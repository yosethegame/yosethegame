function AvatarPreview($) {	
    this.page = $;
}

AvatarPreview.prototype.update = function() {
    this.page('#avatar-preview').attr('src', this.page('#avatar-url').val());
};

var module = module || {};
module.exports = AvatarPreview;