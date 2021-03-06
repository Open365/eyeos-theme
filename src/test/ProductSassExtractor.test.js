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

var ProductSassExtractor = requirejs('../lib/ProductSassExtractor');

suite('ProductSassExtractor', function(){
	var sut;

	var productInfo = {
		products: [
			{
				name: "default",
				sass: ["default_variables.scss", "first.scss", "second.scss", "default_mixins.scss"]
			},
			{
				name: "santfe",
				sass: ["_variables.scss", "_mixins.scss","first.scss"]
			}
		],
		addons: [
			{
				name: "applications",
				sass: ["_variables.scss", "first.scss", "second.scss", "_mixins.scss"]
			},
			{
				name: "startmenu",
				sass: ["_variables.scss", "first.scss"]
			}
		]
	};
	setup(function(){
		sut = new ProductSassExtractor(productInfo);
	});

	suite('#getSass', function(){
		test('Should return a list of sass files with expanded paths', function(){
			var expectedResult = [
				"addons/applications/sass/_variables.scss",
				"addons/startmenu/sass/_variables.scss",
				"products/default/sass/default_variables.scss",
				"products/santfe/sass/_variables.scss",
				"addons/applications/sass/_mixins.scss",
				"products/default/sass/default_mixins.scss",
				"products/santfe/sass/_mixins.scss",
				"addons/applications/sass/first.scss",
				"addons/applications/sass/second.scss",
				"addons/startmenu/sass/first.scss",
				"products/default/sass/first.scss",
				"products/default/sass/second.scss",
				"products/santfe/sass/first.scss"
			];
			var sass = sut.getSass();
			assert.deepEqual(sass, expectedResult);
		});
	});
});
