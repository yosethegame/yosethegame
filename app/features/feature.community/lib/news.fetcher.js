function NewsFetcher() {
    
};

NewsFetcher.prototype.displayNews = function() {
    $('#news-list').append('' +
    '<tr class="news" id="news-1">' +
    	'<td><a href="this-is-my-url"><img src="me"/></a></td>' +
    	'<td>my-news</td>' + 
    '</tr>' +
    '<tr class="news" id="news-2">' +
    	'<td><a href="this-is-your-url"><img src="you"/></a></td>' +
    	'<td>your-news</td>'+
    '</tr>'
    );
};

