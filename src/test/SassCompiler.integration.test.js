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
var SassCompiler = requirejs('../lib/SassCompiler');

suite('SassCompiler', function () {
	var sut;

	var sassData = "$primary-color: #333; $primary-color: #222; body {color: $primary-color;}"
	var anotherSassData = "$secondary-color: #222; body {color: $secondary-color;}";

	setup(function () {
		sut = new SassCompiler();
	});

	suite('#compile', function () {
		test('Should call callback passing expectedData ass second argument', function (done) {
			var expectedData = "body {\n  color: #222; }\n";
			sut.compile(sassData, function(err, sassData) {
				assert.equal(sassData, expectedData);
				done();
			});
		});
		test('Should call callback passing anotherExpectedData as second argument', function (done) {
			var anotherExpectedData = "body {\n  color: #222; }\n";
			sut.compile(anotherSassData, function(err, anotherCssData) {
				assert.equal(anotherCssData, anotherExpectedData);
				done();
			});
		});
	});
});
