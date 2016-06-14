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

var MemoryReader = requirejs('../lib/readers/MemoryReader');

suite('MemoryReader', function(){
	var sut;

	var itemName = "fakeItemName";
	var itemInfo = {};
	var itemInfos = {
		name: itemName
	};
	itemInfo[itemName] = itemInfos;

	setup(function(){
		sut = new MemoryReader(itemInfo);
	});

	suite('#getProductInfo', function(){
		test('Should return a json structure with hardcoded product metadata', function(){
			var info;
			sut.getProductInfo(itemName, function(err, infoArg) {
				info = infoArg;
			});
			assert.deepEqual(info, itemInfos);
		});
	});

	suite('#getAddonInfo', function () {
		test('Should return a json structure with hardcoded addon metadata', function () {
			var info;
			sut.getAddonInfo(itemName, function (err, infoArg) {
				info = infoArg;
			});
			assert.deepEqual(info, itemInfos);
		});
	});

	suite('#getAddonList', function () {
		test('should return a json with the data', function () {
			var info;
			sut.getAddonList(function (err, infoArg) {
				info = infoArg;
			});
			assert.deepEqual(info, itemInfo);
		});
	});
});
