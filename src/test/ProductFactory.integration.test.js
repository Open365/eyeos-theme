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

var ProductFactory = requirejs('ProductFactory');

var util = require('util');

suite('ProductFactory integration ', function () {

	var sut;

	var settings = {
		productsPath: __dirname + '/../fakeData/products/',
		addonsPath: __dirname + '/../fakeData/addons/',
		themesPath: __dirname + '/../fakeData/themes/',
		baseSassUrl: __dirname + '/../fakeData/',
		requireTextPath: __dirname + '/../../node_modules/requirejs-text/text'
	};

	setup(function () {
		sut = new ProductFactory(settings);
	});

	suite('#getProduct', function () {
		suite('#getSass', function () {

			function exercise(productName, themeName, expected, done) {
				sut.getProduct(productName, themeName, function (err, product) {
					var sass = product.getSass();
					assert.deepEqual(expected, sass);
					done();
				});
			}

			test("returns the sass of a base product", function (done) {
				var expected = [
						'addons/startMenu/sass/_variables.scss',
						'products/base/sass/_variables.scss',
						'addons/startMenu/sass/main.scss',
						'products/base/sass/main.scss'
					];

				exercise("base", null, expected, done);
			});

			test("returns the sass of a child product", function (done) {
				var expected = [
					'addons/startMenu/sass/_variables.scss',
					'products/base/sass/_variables.scss',
					'products/custom/sass/_variables.scss',
					'addons/startMenu/sass/main.scss',
					'products/base/sass/main.scss'
				];

				exercise("custom", null, expected, done);
			});

			test("returns the sass of a child with a theme", function (done) {
				var expected = [
					'addons/startMenu/sass/_variables.scss',
					'products/base/sass/_variables.scss',
					'products/custom/sass/_variables.scss',
					'themes/light/sass/_variables.scss',
					'addons/startMenu/sass/main.scss',
					'products/base/sass/main.scss'
				];

				exercise("custom", "light", expected, done);
			});
		});
	});
});
