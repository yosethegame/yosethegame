var fs = require('fs');

var what = function(request, response, database) {
	var html = fs.readFileSync('./app/features/feature.what.is.yose/lib/what.is.yose.html').toString();
	var menu = fs.readFileSync('./app/features/feature.welcome/lib/menu.html').toString();
	html = html.replace('placeholder for the menu', menu);

	var sectionWhatIsYose = fs.readFileSync('./app/features/feature.what.is.yose/lib/section.what.is.yose.html').toString();
	var sectionWhatSInItForYou = fs.readFileSync('./app/features/feature.what.is.yose/lib/section.what.in.it.for.you.html').toString();
	var sectionHowToPlay = fs.readFileSync('./app/features/feature.what.is.yose/lib/section.how.to.play.html').toString();
	var sectionProfiles = fs.readFileSync('./app/features/feature.what.is.yose/lib/section.profiles.html').toString();

	html = html.replace("placeholder for the menu", menu);
    html = html.replace("placeholder for section what is yose?", sectionWhatIsYose);
    html = html.replace("placeholder for section what's in it for you?", sectionWhatSInItForYou);
    html = html.replace("placeholder for section how to play?", sectionHowToPlay);
    html = html.replace("placeholder for section profiles", sectionProfiles);

    response.write(html);
	response.end();
};

module.exports = what;
