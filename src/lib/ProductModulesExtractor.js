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

	var ProductModulesExtractor = function (productInfo) {
		this.productInfo = productInfo;
	};

	ProductModulesExtractor.prototype.getModules = function () {
		var modules = {};

		var iterateModules = function (item) {
			if (!item.modules) {
				return;
			}
			item.modules.forEach(function (module) {
				var path = "modules/" + module + "/" + module;
				modules[module] = path;
			});
		};

		this.productInfo.addons.forEach(iterateModules);

		this.productInfo.products.forEach(iterateModules);

		return modules;
	};

	return ProductModulesExtractor;
});
