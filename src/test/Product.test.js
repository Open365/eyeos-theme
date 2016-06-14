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

var Product = requirejs('../lib/Product');
var ProductSassExtractor = requirejs('../lib/ProductSassExtractor');
var ProductHooksExtractor = requirejs('../lib/ProductHooksExtractor');
var ProductModulesExtractor = requirejs('../lib/ProductModulesExtractor');
var AddonTemplatesExtractor = requirejs('../lib/AddonTemplatesExtractor');

suite('Product', function(){
	var sut;

	var productInfo = {};
	var productSassExtractor, productSassExtractorStub;
	var productHooksExtractor, productHooksExtractorStub;
	var productModulesExtractor, productModulesExtractorStub;
	var addonTemplatesExtractor, addonTemplatesExtractorStub;

	setup(function(){
		productSassExtractor = new ProductSassExtractor();
		productSassExtractorStub = sinon.stub(productSassExtractor);
		productHooksExtractor = new ProductHooksExtractor();
		productHooksExtractorStub = sinon.stub(productHooksExtractor);
		productModulesExtractor = new ProductModulesExtractor();
		productModulesExtractorStub = sinon.stub(productModulesExtractor);
		addonTemplatesExtractor = new AddonTemplatesExtractor();
		addonTemplatesExtractorStub = sinon.stub(addonTemplatesExtractor);

		sut = new Product(productInfo, productSassExtractor, productHooksExtractor, productModulesExtractor, addonTemplatesExtractor);
	});

	suite('#ExtractorMethods', function(){
		test('Should forward the call to this.sassExtractor.getSass', function(){
			sut.getSass();
			sinon.assert.calledWithExactly(productSassExtractorStub.getSass);
		});
		test('Should forward the call to this.hookExtractor.getHooks', function () {
			sut.getHooks();
			sinon.assert.calledWithExactly(productHooksExtractorStub.getHooks);
		});
		test('Should forward the call to this.modulesExtractor.getModules', function () {
			sut.getModules();
			sinon.assert.calledWithExactly(productModulesExtractorStub.getModules);
		});
		test('Should forward the call to this.templatesExtractor.getAddonTemplates', function () {
			sut.getAddonTemplates();
			sinon.assert.calledWithExactly(addonTemplatesExtractorStub.getAddonTemplates);
		});
	});
});
