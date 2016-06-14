/*
    Copyright (c) 2016 eyeOS

    This file is part of Open365.

    Open365 is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var sinon = require('sinon');
var assert = require('chai').assert;
var requirejs = require('requirejs');

requirejs.config({
	nodeRequire: require,
	baseUrl: __dirname + "/../lib/",
	paths: {
		"platformReader": './readers/FSReader'
	}
});

var AddonTemplatesExtractor = requirejs('../lib/AddonTemplatesExtractor');

suite("AddonTemplatesExtractor", function () {
	var sut;
	var productInfo;

	setup(function () {
		productInfo = {
			addons: [{
				"templates": {
					"button": ["button.html"],
					"content": ["content.html"]
				}
			}, {
				"templates": {
					"button": ["button2.html"],
					"content": ["content2.html"]
				}
			}]
		};
		sut = new AddonTemplatesExtractor(productInfo);
	});

	teardown(function () {

	});

	suite("#getAddonTemplates", function () {
		test("returns expected data", function () {
			var expected = {
				"button": ["button.html", "button2.html"],
				"content": ["content.html", "content2.html"]
			};
            var result = sut.getAddonTemplates();
			assert.deepEqual(result, expected);
		});
	});
});
