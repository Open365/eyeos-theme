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

var FSReader = requirejs('../lib/readers/FSReader');

suite("FSReader", function () {
	var sut, name, callback, expectedData, settings;
	setup(function () {
		name = "fakeName";
		callback = function () {};

		settings = {
			productsPath: __dirname + '/testData/products/',
			addonsPath: __dirname + '/testData/addons/'
		};
		sut = new FSReader(settings);
	});

	teardown(function () {

	});

	suite("#getProductInfo", function () {
		test("returns the data of the product", function (done) {
			expectedData = {
				foo: "bar"
			};
			callback = function (err, data) {
				assert.deepEqual(data, expectedData);
				done();
			};
			sut.getProductInfo(name, callback);
		});
	});

	suite("#getAddonInfo", function () {
		test("returns the data of the addon", function (done) {
			expectedData = {
				addonName: "fakeName",
				foo: "bar"
			};
			callback = function (err, data) {
				assert.deepEqual(data, expectedData);
				done();
			};
			sut.getAddonInfo(name, callback);
		});
	});

	suite("#getAddonList", function () {
		test("returns the addon list info", function (done) {
			expectedData = {
				addonList: ["fakeName"],
				foo: "bar"
			};
			callback = function (err, data) {
				assert.deepEqual(data, expectedData);
				done();
			};
			sut.getAddonList(callback);
		});
	});
});
