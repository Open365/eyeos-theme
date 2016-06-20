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

var InfoProvider = requirejs('InfoProvider');

suite('InfoProvider integration ', function () {

	var sut;

	var settings = {
		productsPath: __dirname + '/../fakeData/products/',
		addonsPath: __dirname + '/../fakeData/addons/',
		baseSassUrl: __dirname + '/../fakeData/',
		requireTextPath: __dirname + '/../../node_modules/requirejs-text/text'
	};

	setup(function () {
		sut = new InfoProvider(settings);
	});

	suite('#start', function () {

		function exercise (productName, expected, done) {
			sut.setInformation(productName, null, function (err, info) {

				assert.deepEqual(expected, info.products);
				done();
			});

			sut.start();
		}



		test("Returns the info of a parent product", function (done) {
			var expected = [{
				name: 'base',
				defaultAddons: true,
				sass: ['_variables.scss', 'main.scss'],
				addons: {startMenu: 'full'},
				hooks: {
					'products-default-main': 'main.html',
					'products-default-content': 'content.html',
					'products-default-topbar': 'topbar.html'
				}
			}];

			exercise("base", expected, done);
		});

		test("Returns the info of a child product", function (done) {
			var expected = [{
				name: 'base',
				defaultAddons: true,
				sass: ['_variables.scss', 'main.scss'],
				addons: {startMenu: 'full'},
				hooks: {
					'products-default-main': 'main.html',
					'products-default-content': 'content.html',
					'products-default-topbar': 'topbar.html'
				}
			}, {
				"addons": {},
				"defaultAddons": true,
				"extends": "base",
				"hooks": {},
				"name": "custom",
				"sass": ["_variables.scss"]
			}];

			exercise("custom", expected, done);
		});


	});
});

