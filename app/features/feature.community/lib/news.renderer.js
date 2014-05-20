var $ = $ || require('jquery');

function NewsRenderer() {}

NewsRenderer.prototype.getCurrentTime = function(date) {
    return new Date().getTime();
};

NewsRenderer.prototype.formatDate = function(newsDate) {
    var newsTime = Date.parse(newsDate);
    var delta = this.getCurrentTime() - newsTime;
    
    if (delta < (60*1000)) {
        return Math.floor(delta / (1000)) + ' s ago';
    }

    if (delta < (3600*1000)) {
        return Math.floor(delta / (60 * 1000)) + ' min ago';
    }

    if (delta < (24*3600*1000)) {
        return Math.floor(delta / (3600 * 1000)) + ' h ago';
    }
    
    if (delta < (8*24*3600*1000)) {
        var nb = Math.floor(delta / (24*3600*1000));
        if (nb === 1) {
            return 'yesterday';
        } else {
            return nb + ' days ago';
        }
    }
    
    var date = new Date();
    date.setTime(newsTime);
    var dateAsString = date.toString().split(' ');
    return dateAsString[1] + ' ' + dateAsString[2];
};

NewsRenderer.prototype.display = function(news) {
    var template = $('#news-list').html();
    $('#news-list').empty();
    for (var i=0; i<news.length; i++) {
        var item = news[i];
        var line = template.replace('news-date"></', 'news-date">' + this.formatDate(item.date) + '</')
                           .replace('news-content"></', 'news-content">' + item.text + '</')
                           .replace('href=""', 'href="' + item.url + '"')
                           .replace('src=""', 'src="' + item.image + '"')
                           .replace('news-x', 'news-' + (i+1))
                           ;
        $('#news-list').append(line);
    }    
};

var module = module || {};
module.exports = NewsRenderer;