var removeTrailingSlashOf = function(url) {
    if (url === undefined) return undefined;
    
	if (url[url.length-1] == '/') {
        return url.substring(0, url.length-1);
	}
	else {
        return url;
	}
};

module.exports = removeTrailingSlashOf;