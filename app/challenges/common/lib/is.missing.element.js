var cheerio = require('cheerio');

module.exports = {

    isMissingElement: function(selector, content) {
        var page = cheerio.load(content);

        return page(selector).length === 0;
    }
};