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

define(['fs'], function (fs) {

	var options = {encoding: "utf-8"};

	function FSReader (settings) {
		this.settings = settings;
	}

	FSReader.prototype.getProductInfo = function (name, callback) {
		fs.readFile(this.settings.productsPath + name + '/info.json', options, function (err, data) {
			if (err) throw err;
			callback(false, JSON.parse(data));
		});
	};

	FSReader.prototype.getAddonInfo = function (name, callback) {
		fs.readFile(this.settings.addonsPath + name + '/info.json', options, function (err, data) {
			if (err) throw err;
			callback(false, JSON.parse(data));
		});
	};

	FSReader.prototype.getAddonList = function (callback) {
		fs.readFile(this.settings.addonsPath + 'info.json', options, function (err, data) {
			if (err) throw err;
			callback(false, JSON.parse(data));
		});
	};

	return FSReader;
});
