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

var requires = ['./ThemeSassExtractor', './ThemeHooksExtractor', './ThemeModulesExtractor', './AddonTemplatesExtractor'];
define(requires, function (ThemeSassExtractor, ThemeHooksExtractor, ThemeModulesExtractor, AddonTemplatesExtractor) {
	function Theme (info, sassExtractor, hooksExtractor, modulesExtractor, addonTemplatesExtractor) {
		this.info = info;
		this.sassExtractor = sassExtractor || new ThemeSassExtractor(info);
		this.hooksExtractor = hooksExtractor || new ThemeHooksExtractor(info);
		this.modulesExtractor = modulesExtractor || new ThemeModulesExtractor(info);
		this.addonTemplatesExtractor = addonTemplatesExtractor || new AddonTemplatesExtractor(info);
	}

	Theme.prototype.getSass = function() {
		return this.sassExtractor.getSass();
	};

	Theme.prototype.getHooks = function() {
		return this.hooksExtractor.getHooks();
	};

	Theme.prototype.getModules = function() {
		return this.modulesExtractor.getModules();
	};

	Theme.prototype.getAddonTemplates = function () {
		return this.addonTemplatesExtractor.getAddonTemplates();
	};

	return Theme;
});
