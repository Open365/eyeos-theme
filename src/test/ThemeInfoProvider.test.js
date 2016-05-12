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

var InfoProvider = requirejs('../lib/ThemeInfoProvider');
var MemoryReader = requirejs('../lib/readers/MemoryReader');

suite('ThemeInfoProvider', function () {
	var sut;

	var callbackSpy;
	var memoryReader;

	var themeName = "fakeTheme", parentThemeName = "parentTheme", childThemeName = 'childTheme';
	var themeInfos = {};
	var parentThemeInfo = {
		name: parentThemeName
	};
	var themeInfo = {
		name: themeName,
		extends: parentThemeName
	};
	var childTheme = {
		name: childThemeName,
		extends: themeName
	};
	themeInfos[themeName] = themeInfo;
	themeInfos[childThemeName] = childTheme;
	themeInfos[parentThemeName] = parentThemeInfo;

	memoryReader = new MemoryReader(themeInfos);

	suite('ThemeInfoProvider single theme', function () {
		setup(function () {
			callbackSpy = sinon.spy();
			sut = new InfoProvider({}, memoryReader);
			sut.setInformation(parentThemeName, callbackSpy);
		});

		suite('#start', function () {
			test('The callback should be executed with the expected single theme information', function () {
				sut.start();
				sinon.assert.calledWithExactly(callbackSpy, false, [parentThemeInfo]);
			});
		});
	});

	suite('ThemeInfoProvider parent', function () {
		setup(function () {
			callbackSpy = sinon.spy();
			sut = new InfoProvider({}, memoryReader);
			sut.setInformation(themeName, callbackSpy);
		});

		suite('#start', function () {
			test('The callback should be executed with the parent and the ' + themeName + 'information', function () {
				sut.start();
				sinon.assert.calledWithExactly(callbackSpy, false, [parentThemeInfo, themeInfo]);
			});
		});
	});

	suite('ThemeInfoProvider parent and grandparent', function () {
		setup(function () {
			callbackSpy = sinon.spy();
			sut = new InfoProvider({}, memoryReader);
			sut.setInformation(childThemeName, callbackSpy);
		});

		suite('#start', function () {
			test('The callback should be executed with the grandparent, parent and the ' + childThemeName + 'information', function () {
				sut.start();
				sinon.assert.calledWithExactly(callbackSpy, false, [parentThemeInfo, themeInfo, childTheme]);
			});
		});
	});
});
