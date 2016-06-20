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

define([
	'./ProductInfoProvider',
	'./AddonsInfoProvider',
	'./ThemeInfoProvider'
], function (ProductInfoProvider, AddonsInfoProvider, ThemeInfoProvider) {
	'use strict';

	function InfoProvider(settings, productInfoProvider, addonsInfoProvider, themeInfoProvider) {
		this.productInfoProvider = productInfoProvider || new ProductInfoProvider(settings);
		this.addonsInfoProvider = addonsInfoProvider || new AddonsInfoProvider(settings);
		this.themeInfoProvider = themeInfoProvider || new ThemeInfoProvider(settings);
	}

	InfoProvider.prototype.setInformation = function (name, theme, callback) {
		this.name = name;
		this.theme = theme;
		this.callback = callback;
	};

	InfoProvider.prototype.start = function () {
		this.productInfoProvider.setInformation(this.name, this.processProductInfo.bind(this));

		this.productInfoProvider.start();

	};

	InfoProvider.prototype.processProductInfo = function (err, info) {

		this.err = err;
		if (this.err) {
			this.__gotAllInfo();
		}

		this.productInfo = info;
		var addons = {
			defaultAddons: false
		};

		var addonNames = [];
		var addonIndex;
		info.forEach(function (item) {
			if (item.defaultAddons) {
				addons.defaultAddons = true;
			}
			if (item.addons) {
				for(var key in item.addons) {
					addonIndex = addonNames.indexOf(key);
					if (item.addons[key] === "none" && addonIndex !== -1) {
						addonNames.splice(addonIndex, 1); //Remove it
					} else if (item.addons[key] === "full" && addonIndex === -1){
						addonNames.push(key);
					}
				}
			}
		});

		addons.names = addonNames;
		var self = this;
		this.addonsInfoProvider.setInformation(addons, function (err, info) {
			self.addonsInfo = info;
			if (self.themeInfo || !self.theme) {
				self.__gotAllInfo();
			}
		});
		this.addonsInfoProvider.start();

		if (this.theme) {
			this.themeInfoProvider.setInformation(this.theme, function (err, info) {
				self.err = err;
				self.themeInfo = info;
				if (self.err || self.addonsInfo) {
					self.__gotAllInfo();
				}
			});
			this.themeInfoProvider.start();
		}

	};

	InfoProvider.prototype.__gotAllInfo = function () {
		this.callback(this.err, {
			products: this.productInfo,
			addons: this.addonsInfo,
			theme: this.themeInfo
		});
	};

	return InfoProvider;
});
