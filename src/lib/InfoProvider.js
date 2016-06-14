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

define(['./ProductInfoProvider', './AddonsInfoProvider'], function (ProductInfoProvider, AddonsInfoProvider) {
	'use strict';

	function InfoProvider(settings, productInfoProvider, addonsInfoProvider) {
		this.productInfoProvider = productInfoProvider || new ProductInfoProvider(settings);
		this.addonsInfoProvider = addonsInfoProvider || new AddonsInfoProvider(settings);
	}

	InfoProvider.prototype.setInformation = function (name, callback) {
		this.name = name;
		this.callback = callback;
	};

	InfoProvider.prototype.start = function () {
		this.productInfoProvider.setInformation(this.name, this.processProductInfo.bind(this));

		this.productInfoProvider.start();

	};

	InfoProvider.prototype.processProductInfo = function (err, info) {
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
		this.addonsInfoProvider.setInformation(addons, this.__gotAllInfo.bind(this));
		this.addonsInfoProvider.start();


	};

	InfoProvider.prototype.__gotAllInfo = function (err, info) {
		this.callback(err, {
			products: this.productInfo,
			addons: info
		});
	};

	return InfoProvider;
});
