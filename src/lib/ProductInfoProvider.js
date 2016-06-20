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

define(['platformReader'], function (Reader) {
	function InfoProvider (settings, reader) {
		this.reader = reader || new Reader(settings);
		this.productInfos = [];
	}

	InfoProvider.prototype.setInformation = function(name, callback) {
		this.name = name;
		this.callback = callback;
	};

	InfoProvider.prototype.start = function () {
		this.__________DONT_USE______________________getProductInfoFromReader(this.name);
	};

	InfoProvider.prototype.gotInfo = function(err, productInfo) {
		this.productInfos.unshift(productInfo);
		if (productInfo.extends) {
			this.__________DONT_USE______________________getProductInfoFromReader(productInfo.extends);
			return;
		}

		this.callback(err, this.productInfos);
	};

	//Super highly privte method
	InfoProvider.prototype.__________DONT_USE______________________getProductInfoFromReader = function(name) {
		this.reader.getProductInfo(name, this.gotInfo.bind(this));
	};



	return InfoProvider;
});
