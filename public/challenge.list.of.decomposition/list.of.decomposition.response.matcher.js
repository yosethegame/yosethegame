var NumberChooser 	= require('../levels.common/integer.chooser');
var StringChooser 	= require('../levels.common/string.chooser');
var Browser 		= require('zombie');
var primeFactorsOf	= require('../levels.common/prime.factors');

module.exports = {

	numberChooser: new NumberChooser(),
	stringChooser: new StringChooser(),
	
	expectedResult: function(number) {
		return number + ' = ' + primeFactorsOf(number).join(' x ');
	},
	
	getInput: function() {
		return this.numberChooser.getNumber() + ', ' + this.numberChooser.getNumber() + ', ' + this.stringChooser.getString();
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var input = this.getInput();
		var numbers = input.split(',');	
		
		var browser = new Browser();
		browser.visit(url).
			then(function () {
				return browser.fill('input#number', input)
					   		  .pressButton("button#go");
			}).
			then(function() {
				if(browser.query('ol#results') == null) {
					throw 'Error: missing element ol#results';
				}
				if(browser.query('ol#results li:nth-of-type(1)') == null) {
					throw 'Error: missing element ol#results li:nth-of-type(1)';
				}
				if(browser.query('ol#results li:nth-of-type(2)') == null) {
					throw 'Error: missing element ol#results li:nth-of-type(2)';
				}
				if(browser.query('ol#results li:nth-of-type(3)') == null) {
					throw 'Error: missing element ol#results li:nth-of-type(3)';
				}
				if(browser.queryAll('ol#results li').length != 3) {
					throw 'Error: ol#results has ' + browser.queryAll('ol#results li').length + ' li';
				}
				if(browser.text('ol#results li:nth-of-type(1)') != self.expectedResult(numbers[0].trim())) {
					throw 'Error: ol#results li:nth-of-type(1) contains ' + browser.text('ol#results li:nth-of-type(1)');
				}
				if(browser.text('ol#results li:nth-of-type(2)') != self.expectedResult(numbers[1].trim())) {
					throw 'Error: ol#results li:nth-of-type(2) contains ' + browser.text('ol#results li:nth-of-type(2)');
				}
				if(browser.text('ol#results li:nth-of-type(3)') != (numbers[2].trim() + ' is not a number')) {
					throw 'Error: ol#results li:nth-of-type(3) contains ' + browser.text('ol#results li:nth-of-type(3)');
				}
				var expected = "A page containing a list ol#results with 3 items"
						  + " AND ol#results li:nth-of-type(1) containing " + self.expectedResult(numbers[0].trim())
						  + " AND ol#results li:nth-of-type(2) containing " + self.expectedResult(numbers[1].trim())
						  + " AND ol#results li:nth-of-type(3) containing " + numbers[2].trim() + ' is not a number'; 
				callback({
					code: 200,
					expected: expected,
					got: expected
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: "A page containing a list ol#results with 3 items"
							  + " AND ol#results li:nth-of-type(1) containing " + self.expectedResult(numbers[0].trim())
							  + " AND ol#results li:nth-of-type(2) containing " + self.expectedResult(numbers[1].trim())
							  + " AND ol#results li:nth-of-type(3) containing " + numbers[2].trim() + ' is not a number'
					,
					got: error.toString()
				})
			});
	}
	
};