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

var ProductModulesExtractor = requirejs('../lib/ProductModulesExtractor');

suite('ProductModulesExtractor', function(){
	var sut;

	var productInfo = {
		products: [{
			name: "default",
			modules: ["defaultProductModule"]
		}],
		addons: [{
			name: "applications",
			modules: ["applicationsModule"]
		}, {
			name: "startmenu",
			modules: ["startMenu"]
		}]
	};
	setup(function(){
		sut = new ProductModulesExtractor(productInfo);
	});

	suite('#getModules', function(){
		test('Should return a list of modules files with expanded paths ', function(){
			var expectedModules = {
				applicationsModule: "modules/applicationsModule/applicationsModule",
				startMenu: "modules/startMenu/startMenu",
				defaultProductModule: "modules/defaultProductModule/defaultProductModule"
			};
			var modules = sut.getModules();
			assert.deepEqual(modules, expectedModules);
		});
	});
});