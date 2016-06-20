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

var ProductHooksExtractor = requirejs('../lib/ProductHooksExtractor');

suite('ProductHooksExtractor', function(){
	var sut;

	var productInfo = {
		products: [
			{
				name: "default",
				hooks: {
					"products_default_main": "main.html",
					"products_default_content": "content.html",
					"products_default_topbar": "topbar.html",
					"addons_applications_icon": "myOwnApplications.html"
				}
			},
			{
				name: "santfe",
				hooks: {
					"products_default_main": "main.html",
					"products_default_content": "content.html",
					"products_default_topbar": "topbar.html",
					"addons_startmenu_icon": "icon.html",
				}
			}
		],
		addons: [
			{
				name: "applications",
				hooks: {
					"addons_applications_icon": "icon.html"
				}
			},
			{
				name: "startmenu",
				hooks: {
					"addons_startmenu_icon": "icon.html"
				}
			}
		]
	};
	setup(function(){
		sut = new ProductHooksExtractor(productInfo);
	});

	suite('#getHooks', function(){
		test('Should return a list of hooks files with expanded paths', function(){
			var expectedHooks = {
				addons_applications_icon: 'products/default/templates/myOwnApplications.html',
				addons_startmenu_icon: 'products/santfe/templates/icon.html',
				products_default_main: 'products/santfe/templates/main.html',
				products_default_content: 'products/santfe/templates/content.html',
				products_default_topbar: 'products/santfe/templates/topbar.html'
			};
			var hooks = sut.getHooks();
			assert.deepEqual(hooks, expectedHooks);
		});
	});
});
