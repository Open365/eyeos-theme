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

var InfoProvider = requirejs('../lib/AddonsInfoProvider');
var MemoryReader = requirejs('../lib/readers/MemoryReader');

suite('AddonsInfoProvider', function(){
	var sut;
	var addonsList;
	var addonData, fooData, applicationsData, barData;

	setup(function () {
		applicationsData = [{
			"button": ["templates/button.html"],
			"content": ["templates/content.html"],
			"sass": ["sass/variables.sass", "sass/applications.sass"],
			"modules": ["ApplicationsModule"],
			"hooks": {
				"addons-applications-icon": "templates/icon.html"
			}
		}];
		fooData = [{
			"button": ["templates/button.html"],
			"content": ["templates/content.html"],
			"sass": ["sass/variables.sass", "sass/foo.sass"],
			"hooks": {
				"addons-applications-icon": "templates/icon.html"
			}
		}];
		barData = [{
			"button": ["templates/button.html"],
			"sass": ["sass/variables.sass", "sass/bar.sass"]
		}];
		addonData = {
			defaultAddons: ["bar"],
			applications: applicationsData,
			foo: fooData,
			bar: barData
		};

		addonsList = {
			defaultAddons: true,
			names: ["applications", "foo"]
		};

		memoryReader = new MemoryReader(addonData);
		callbackSpy = sinon.spy();
		sut = new InfoProvider({}, memoryReader);
		sut.setInformation(addonsList, callbackSpy);
	});

	suite('#start', function(){
		test('The callback should be executed with the expected addons when default is required', function(){
			sut.start();
			expectedAddonInfo = [applicationsData, fooData, barData];
			sinon.assert.calledWithExactly(callbackSpy, false, expectedAddonInfo);
		});

		test('The callback should be executed with the expected addons when default is not required', function () {
			addonsList.defaultAddons = false;
			sut.start();
			expectedAddonInfo = [applicationsData, fooData];
			sinon.assert.calledWithExactly(callbackSpy, false, expectedAddonInfo);
		});

		test('The callback should be executed with no addons when there is no addons names', function () {
			addonsList.defaultAddons = false;
			addonsList.names = [];
			sut.start();
			expectedAddonInfo = [];
			sinon.assert.calledWithExactly(callbackSpy, false, expectedAddonInfo);
		});

		test('No addon is repeaded in the returned data if they are in default list and in the addon names list', function () {
			addonData.defaultAddons = ["applications", "bar"];
			sut.start();
			expectedAddonInfo = [applicationsData, fooData, barData];
			sinon.assert.calledWithExactly(callbackSpy, false, expectedAddonInfo);
		});
	});
});
