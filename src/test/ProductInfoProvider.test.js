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

var InfoProvider = requirejs('../lib/ProductInfoProvider');
var MemoryReader = requirejs('../lib/readers/MemoryReader');

suite('ProductInfoProvider', function () {
	var sut;

	var callbackSpy;
	var memoryReader;

	var productName = "fakeProduct", parentProductName = "parentProduct", childProductName = 'childProduct';
	var productInfos = {};
	var parentProductInfo = {
		name: parentProductName
	};
	var productInfo = {
		name: productName,
		extends: parentProductName
	};
	var childProduct = {
		name: childProductName,
		extends: productName
	};
	productInfos[productName] = productInfo;
	productInfos[childProductName] = childProduct;
	productInfos[parentProductName] = parentProductInfo;

	memoryReader = new MemoryReader(productInfos);

	suite('ProductInfoProvider single product', function () {
		setup(function () {
			callbackSpy = sinon.spy();
			sut = new InfoProvider({}, memoryReader);
			sut.setInformation(parentProductName, callbackSpy);
		});

		suite('#start', function () {
			test('The callback should be executed with the expected single product information', function () {
				sut.start();
				sinon.assert.calledWithExactly(callbackSpy, false, [parentProductInfo]);
			});
		});
	});

	suite('ProductInfoProvider parent', function () {
		setup(function () {
			callbackSpy = sinon.spy();
			sut = new InfoProvider({}, memoryReader);
			sut.setInformation(productName, callbackSpy);
		});

		suite('#start', function () {
			test('The callback should be executed with the parent and the ' + productName + 'information', function () {
				sut.start();
				sinon.assert.calledWithExactly(callbackSpy, false, [parentProductInfo, productInfo]);
			});
		});
	});

	suite('ProductInfoProvider parent and grandparent', function () {
		setup(function () {
			callbackSpy = sinon.spy();
			sut = new InfoProvider({}, memoryReader);
			sut.setInformation(childProductName, callbackSpy);
		});

		suite('#start', function () {
			test('The callback should be executed with the grandparent, parent and the ' + childProductName + 'information', function () {
				sut.start();
				sinon.assert.calledWithExactly(callbackSpy, false, [parentProductInfo, productInfo, childProduct]);
			});
		});
	});
});
