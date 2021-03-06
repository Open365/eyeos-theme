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
var ProductInfoProvider = requirejs('../lib/ProductInfoProvider');
var AddonsInfoProvider = requirejs('../lib/AddonsInfoProvider');

suite("InfoProvider", function () {
	var sut, productInfoProvider, name, callback, addonsInfoProvider, addonInfo;
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


		productInfoProvider = new ProductInfoProvider();
		setInformationStub = sinon.stub(productInfoProvider, "setInformation");
		startStub = sinon.stub(productInfoProvider, "start");

		addonsInfoProvider = new AddonsInfoProvider();
		addonsSetInformationStub = sinon.stub(addonsInfoProvider, "setInformation", function (addons, callback) {
			callback(false, addonInfo);
		});
		addonsStartStub = sinon.stub(addonsInfoProvider, "start");

		sut = new InfoProvider({}, productInfoProvider, addonsInfoProvider);
		sut.setInformation(name, null, callback);
	});

	teardown(function () {

	});

	suite("#start", function () {
		test("calls productInfoProvider.setInformation", function () {
			sut.start();
			sinon.assert.calledWithExactly(setInformationStub, name, sinon.match.func);
		});

		test("calls productInfoProvider.start", function () {
			sut.start();
			sinon.assert.calledWithExactly(startStub);
		});

	});

	suite("#processProductInfo", function () {
		var productInfo;
		setup(function () {
			productInfo = [{
				"defaultAddons": true,
				"addons": {
					"applications": "full"
				}
			}];
		});

		test("calls AddonsInfoProvider.setInformation with one product", function () {
			var addons = {
				defaultAddons: true,
				names: ["applications"]
			};
			sut.processProductInfo(false, productInfo);
			sinon.assert.calledWithExactly(addonsSetInformationStub, addons, sinon.match.func);
		});

		test("calls AddonsInfoProvider.setInformation with multiple products", function () {
			productInfo = [{
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
			sut.processProductInfo(false, productInfo);
			sinon.assert.calledWithExactly(addonsSetInformationStub, addons, sinon.match.func);
		});

		test("calls AddonsInfoProvider.start", function () {
			sut.processProductInfo(false, productInfo);
			sinon.assert.calledWithExactly(addonsStartStub);
		});

		test("AddonsInfoProvider callback calls the class callback", function () {
			sut.processProductInfo(false, productInfo);
			sinon.assert.calledWithExactly(callback, false, {
				products: productInfo,
				addons: addonInfo,
				theme: undefined
			});
		});

		test("calls AddonsInfoProvider.setInformation with multiple products without duplications", function () {
			productInfo = [{
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
			sut.processProductInfo(false, productInfo);
			sinon.assert.calledWithExactly(addonsSetInformationStub, addons, sinon.match.func);
		});
	});
});
