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

define([], function () {

	var ThemeHooksExtractor = function (themeInfo) {
		this.themeInfo = themeInfo;
	};

	ThemeHooksExtractor.prototype.getHooks = function () {
		var hooks = {};

		this.themeInfo.addons.forEach(function (addon) {
			var keys = Object.keys(addon.hooks);
			keys.forEach(function (hookfile) {
				var path = "addons/" + addon.name + "/templates/" + addon.hooks[hookfile]
				hooks[hookfile] = path;
			});
		});

		this.themeInfo.themes.forEach(function (theme) {
			var keys = Object.keys(theme.hooks);
			keys.forEach(function (hookfile) {
				var path = "themes/" + theme.name + "/templates/" + theme.hooks[hookfile]
				hooks[hookfile] = path;
			});
		});

		return hooks;
	};

	return ThemeHooksExtractor;
});
