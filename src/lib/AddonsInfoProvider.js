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
	}

	InfoProvider.prototype.setInformation = function (data, callback) {
		this.addonData = data;
		this.callback = callback;
		this.infos = [];
	};

	InfoProvider.prototype.start = function () {
		if (this.addonData.defaultAddons) {
			var self = this;
			this.reader.getAddonList(function (err, data) {
				if (err) {
					console.log("ERROR fetching addons list info", err);
					self.__gotInfo(err);
					return;
				}

				if (data.defaultAddons) {
					var names = self.addonData.names;
					data.defaultAddons.forEach(function (addon) {
						if (names.indexOf(addon) === -1) {
							names.push(addon);
						}

					});
				}
				self.__fetchInfo();
			});
			return;
		}

		this.__fetchInfo();

	};

	InfoProvider.prototype.__fetchInfo = function () {
		var self = this;
		var namesLength = this.addonData.names.length;
		if (!namesLength) {
			self.__gotInfo(false);
			return;
		}
		this.addonData.names.forEach(function (name) {
			self.reader.getAddonInfo(name, function (err, info) {
				if (err) {
					console.log("ERROR fetching addon "+  name, err);
					self.__gotInfo(err);
					return;
				}
				self.infos.push(info);
				if (self.infos.length === namesLength) {
					self.__gotInfo(false);
				}
			})
		});
	};

	InfoProvider.prototype.__gotInfo = function (err) {
		this.callback(err, this.infos);
	};



	return InfoProvider;
});
