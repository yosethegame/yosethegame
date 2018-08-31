var Browser         = require('zombie');
var NumberChooser   = require('../../common/lib/integer.chooser');
var StringChooser   = require('../../common/lib/string.chooser');
var primeFactorsOf	= require('../../common/lib/prime.factors');
var array			= require('../../../../utils/lib/array.utils');

module.exports = {

	numberChooser: new NumberChooser(),
	stringChooser: new StringChooser(),
	
	expectedResult: function(number) {
		return number + ' = ' + primeFactorsOf(number).join(' x ');
	},
	
	getInput: function() {
		return this.numberChooser.getNumber() + ', ' + this.numberChooser.getNumber() + ', ' + this.stringChooser.getString();
	},
	
	listShouldExist: function(browser) {
		if(browser.query('ol#results') === null) {
			throw 'Error: missing element ol#results';
		}
	},
	
	listShouldHaveThreeItems: function(browser) {
		if(browser.queryAll('ol#results li').length !== 3) {
			throw 'Error: ol#results has ' + browser.queryAll('ol#results li').length + ' li';
		}				
	},
	
	itemShouldExist: function(browser) {
		return function(index) {
			if(browser.query('ol#results li:nth-of-type(' + index + ')') === null) {
				throw 'Error: missing element ol#results li:nth-of-type(' + index + ')';
			}
		};
	},
	
	itemShouldHaveExpectedResult: function(browser, numbers, expectedResult) {
		return function(index) {
			if(browser.text('ol#results li:nth-of-type(' + index + ')') !== expectedResult(numbers[index-1].trim())) {
				throw 'Error: ol#results li:nth-of-type(' + index + ') contains ' + browser.text('ol#results li:nth-of-type(' + index + ')');
			}
		};
	},
	
	lastItemShouldHaveExpectedResult: function(browser, value) {
		if(browser.text('ol#results li:nth-of-type(3)') != (value + ' is not a number')) {
			throw 'Error: ol#results li:nth-of-type(3) contains ' + browser.text('ol#results li:nth-of-type(3)');
		}
	},
	
	expectedAnswer: function(numbers, expectedResult) {
		return "A page containing a list ol#results with 3 items" +
                " AND ol#results li:nth-of-type(1) containing " + expectedResult(numbers[0].trim()) +
                " AND ol#results li:nth-of-type(2) containing " + expectedResult(numbers[1].trim()) +
                " AND ol#results li:nth-of-type(3) containing " + numbers[2].trim() + ' is not a number';
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var input = this.getInput();
		var numbers = input.split(',');	
		
		var browser = new Browser();
		browser.visit(url).
			then(function () {
				return browser.fill('input#number', input);
			}).
			then(function () {
				return browser.pressButton("button#go");
			}).
			then(function() {
				self.listShouldExist(browser);
				array.forEach([1, 2, 3], self.itemShouldExist(browser));
				self.listShouldHaveThreeItems(browser);
				array.forEach([1, 2], self.itemShouldHaveExpectedResult(browser, numbers, self.expectedResult));
				self.lastItemShouldHaveExpectedResult(browser, numbers[2].trim());
			}).
			done(
                function() {
    				callback({
    					code: 200,
    					expected: self.expectedAnswer(numbers, self.expectedResult),
    					got: self.expectedAnswer(numbers, self.expectedResult)
    				});
                },
                function(error) {
                    callback({
					    code: 501,
                        expected: self.expectedAnswer(numbers, self.expectedResult),
                        got: error.toString()
                    });
			    }
            );
	}
	
};