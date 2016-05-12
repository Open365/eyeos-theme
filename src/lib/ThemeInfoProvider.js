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
		this.themeInfos = [];
	}

	InfoProvider.prototype.setInformation = function(name, callback) {
		this.name = name;
		this.callback = callback;
	};

	InfoProvider.prototype.start = function () {
		this.__________DONT_USE______________________getThemeInfoFromReader(this.name);
	};

	InfoProvider.prototype.gotInfo = function(err, themeInfo) {
		this.themeInfos.unshift(themeInfo);
		if (themeInfo.extends) {
			this.__________DONT_USE______________________getThemeInfoFromReader(themeInfo.extends);
			return;
		}

		this.callback(err, this.themeInfos);
	};

	//Super highly privte method
	InfoProvider.prototype.__________DONT_USE______________________getThemeInfoFromReader = function(name) {
		this.reader.getThemeInfo(name, this.gotInfo.bind(this));
	};



	return InfoProvider;
});
