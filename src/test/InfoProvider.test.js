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

var InfoProvider = requirejs('../lib/InfoProvider');
var ThemeInfoProvider = requirejs('../lib/ThemeInfoProvider');
var AddonsInfoProvider = requirejs('../lib/AddonsInfoProvider');

suite("InfoProvider", function () {
	var sut, themeInfoProvider, name, callback, addonsInfoProvider, addonInfo;
	var setInformationStub, startStub, addonsSetInformationStub, addonsStartStub;
	setup(function () {
		callback = sinon.spy();
		name = "fakeName";
		addonInfo = [{
			"button": ["templates/button.html"],
			"content": ["templates/content.html"],
			"sass": ["sass/variables.sass", "sass/foo.sass"],
			"modules": ["ApplicationsModule"],
			"hooks": {
				"addons-applications-icon": "templates/icon.html"
			}
		}];


		themeInfoProvider = new ThemeInfoProvider();
		setInformationStub = sinon.stub(themeInfoProvider, "setInformation");
		startStub = sinon.stub(themeInfoProvider, "start");

		addonsInfoProvider = new AddonsInfoProvider();
		addonsSetInformationStub = sinon.stub(addonsInfoProvider, "setInformation", function (addons, callback) {
			callback(false, addonInfo);
		});
		addonsStartStub = sinon.stub(addonsInfoProvider, "start");

		sut = new InfoProvider({}, themeInfoProvider, addonsInfoProvider);
		sut.setInformation(name, callback);
	});

	teardown(function () {

	});

	suite("#start", function () {
		test("calls themeInfoProvider.setInformation", function () {
			sut.start();
			sinon.assert.calledWithExactly(setInformationStub, name, sinon.match.func);
		});

		test("calls themeInfoProvider.start", function () {
			sut.start();
			sinon.assert.calledWithExactly(startStub);
		});

	});

	suite("#processThemeInfo", function () {
		var themeInfo;
		setup(function () {
			themeInfo = [{
				"defaultAddons": true,
				"addons": {
					"applications": "full"
				}
			}];
		});

		test("calls AddonsInfoProvider.setInformation with one theme", function () {
			var addons = {
				defaultAddons: true,
				names: ["applications"]
			};
			sut.processThemeInfo(false, themeInfo);
			sinon.assert.calledWithExactly(addonsSetInformationStub, addons, sinon.match.func);
		});

		test("calls AddonsInfoProvider.setInformation with multiple themes", function () {
			themeInfo = [{
				"defaultAddons": true,
				"addons": {
					"applications": "full"
				}
			}, {
				"addons": {
					"foo": "full"
				}
			}];
			var addons = {
				defaultAddons: true,
				names: ["applications", "foo"]
			};
			sut.processThemeInfo(false, themeInfo);
			sinon.assert.calledWithExactly(addonsSetInformationStub, addons, sinon.match.func);
		});

		test("calls AddonsInfoProvider.start", function () {
			sut.processThemeInfo(false, themeInfo);
			sinon.assert.calledWithExactly(addonsStartStub);
		});

		test("AddonsInfoProvider callback calls the class callback", function () {
			sut.processThemeInfo(false, themeInfo);
			sinon.assert.calledWithExactly(callback, false, {
				themes: themeInfo,
				addons: addonInfo
			});
		});

		test("calls AddonsInfoProvider.setInformation with multiple themes without duplications", function () {
			themeInfo = [{
				"defaultAddons": true,
				"addons": {
					"applications": "full"
				}
			}, {
				"addons": {
					"applications": "full",
					"foo": "full"
				}
			}];
			var addons = {
				defaultAddons: true,
				names: ["applications", "foo"]
			};
			sut.processThemeInfo(false, themeInfo);
			sinon.assert.calledWithExactly(addonsSetInformationStub, addons, sinon.match.func);
		});
	});
});
