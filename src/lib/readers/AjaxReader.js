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
	var options = {dataType: "json"};

	function AjaxReader (settings) {
		this.settings = settings;
	}

	AjaxReader.prototype.getProductInfo = function (name, callback) {
		var self = this;
		$.ajax(this.settings.productsPath + name + '/info.json', options).then(function (data) {
			callback(false, data);
		}, function (xhr, textStatus) {
			console.log(self.settings.productsPath + name + '/info.json' + " AJAX ERROR!!!", textStatus);
		});
	};

	AjaxReader.prototype.getAddonInfo = function (name, callback) {
		var self = this;
		$.ajax(this.settings.addonsPath + name + '/info.json', options).then(function (data) {
			callback(false, data);
		}, function (xhr, textStatus) {
			console.log(self.settings.addonsPath + name + '/info.json' + " AJAX ERROR!!!", textStatus);
		});
	};

	AjaxReader.prototype.getAddonList = function (callback) {
		var self = this;
		$.ajax(this.settings.addonsPath + 'info.json', options).then(function (data) {
			callback(false, data);
		}, function (xhr, textStatus) {
			console.log(self.settings.addonsPath + 'info.json' + "AJAX ERROR!!!", textStatus);
		});
	};

	return AjaxReader;
});
