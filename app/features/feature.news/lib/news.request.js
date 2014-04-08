var newsEndpoint = function(request, response, database) {

    var news = [
        {
            date: '26 Feb',
            image: 'me',
            url: 'my-url',
            text: 'my-news'
        },
        {
            date: '1 Jan',
            image: 'you',
            url: 'your-url',
            text: 'your-news'
        },
    ];
	
	response.write(JSON.stringify(news));
    response.end();
};

module.exports = newsEndpoint;