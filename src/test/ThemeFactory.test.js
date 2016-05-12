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

var ThemeFactory = requirejs('../lib/ThemeFactory');
var ThemeInfoProvider = requirejs('../lib/ThemeInfoProvider');

suite('ThemeFactory', function () {
	var sut, callback, name, infoProvider, getInfoStub, info;

	setup(function () {
		callback = function () {};
		info = {
			name: name
		};

		infoProvider = new ThemeInfoProvider();
		getInfoStub = sinon.stub(infoProvider, "start", function () {
			this.callback(0, info);
		});
		name = "fakeName";
		sut = new ThemeFactory({}, infoProvider);
	});

	suite('#get ', function () {
		test('calls the infoProvider.start', function () {
			sut.getTheme(name, callback);
			getInfoStub.calledWithExactly();
		});

		test('returns an initialized theme with the theme info', function () {
			var resultInfo;
			callback = function (err, theme) {
				resultInfo = theme.info;
			};

			sut.getTheme(name, callback);
			assert.deepEqual(resultInfo, info);
		});

	});
});
