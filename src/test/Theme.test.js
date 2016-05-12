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

var Theme = requirejs('../lib/Theme');
var ThemeSassExtractor = requirejs('../lib/ThemeSassExtractor');
var ThemeHooksExtractor = requirejs('../lib/ThemeHooksExtractor');
var ThemeModulesExtractor = requirejs('../lib/ThemeModulesExtractor');
var AddonTemplatesExtractor = requirejs('../lib/AddonTemplatesExtractor');

suite('Theme', function(){
	var sut;

	var themeInfo = {};
	var themeSassExtractor, themeSassExtractorStub;
	var themeHooksExtractor, themeHooksExtractorStub;
	var themeModulesExtractor, themeModulesExtractorStub;
	var addonTemplatesExtractor, addonTemplatesExtractorStub;

	setup(function(){
		themeSassExtractor = new ThemeSassExtractor();
		themeSassExtractorStub = sinon.stub(themeSassExtractor);
		themeHooksExtractor = new ThemeHooksExtractor();
		themeHooksExtractorStub = sinon.stub(themeHooksExtractor);
		themeModulesExtractor = new ThemeModulesExtractor();
		themeModulesExtractorStub = sinon.stub(themeModulesExtractor);
		addonTemplatesExtractor = new AddonTemplatesExtractor();
		addonTemplatesExtractorStub = sinon.stub(addonTemplatesExtractor);

		sut = new Theme(themeInfo, themeSassExtractor, themeHooksExtractor, themeModulesExtractor, addonTemplatesExtractor);
	});

	suite('#ExtractorMethods', function(){
		test('Should forward the call to this.sassExtractor.getSass', function(){
			sut.getSass();
			sinon.assert.calledWithExactly(themeSassExtractorStub.getSass);
		});
		test('Should forward the call to this.hookExtractor.getHooks', function () {
			sut.getHooks();
			sinon.assert.calledWithExactly(themeHooksExtractorStub.getHooks);
		});
		test('Should forward the call to this.modulesExtractor.getModules', function () {
			sut.getModules();
			sinon.assert.calledWithExactly(themeModulesExtractorStub.getModules);
		});
		test('Should forward the call to this.templatesExtractor.getAddonTemplates', function () {
			sut.getAddonTemplates();
			sinon.assert.calledWithExactly(addonTemplatesExtractorStub.getAddonTemplates);
		});
	});
});
