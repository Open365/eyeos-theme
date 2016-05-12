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

	function SassFetcher (settings) {
		this.settings = settings;
	}

	SassFetcher.prototype.fetchSass = function(sassFiles, callback) {
		var requireSettings = {
			context: "themeRequire",
			baseUrl: this.settings.baseSassUrl,
			paths: {}
		};

		requireSettings.paths.text = require.toUrl('text');

		var sassFetcherRequire = require.config(requireSettings);
		sassFiles.forEach(function(file, index) {
			sassFiles[index] = "text!" + file;
		});

		sassFetcherRequire(sassFiles, function () {
			var args = Array.prototype.slice.call(arguments);
			callback(false, args.join(""));
		});
	};

	return SassFetcher;
});
