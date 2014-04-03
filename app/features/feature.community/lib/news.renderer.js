var $ = $ || require('jquery');

function NewsRenderer() {}

NewsRenderer.prototype.display = function(news) {
    var template = $('#news-list').html();
    $('#news-list').empty();
    for (var i=0; i<news.length; i++) {
        var item = news[i];
        var line = template.replace('class="news-date"></', 'class="news-date">' + item.date + '</')
                           .replace('class="news-content"></', 'class="news-content">' + item.text + '</')
                           .replace('href=""', 'href="' + item.url + '"')
                           .replace('src=""', 'src="' + item.image + '"')
                           .replace('news-x', 'news-' + (i+1))
                           ;
        $('#news-list').append(line);
    }    
};

var module = module || {};
module.exports = NewsRenderer;