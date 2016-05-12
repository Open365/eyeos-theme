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

	var ThemeSassExtractor = function (themeInfo) {
		this.themeInfo = themeInfo;
	};

	function stringEndsWith(haystack, needle) {
		return haystack.indexOf(needle, haystack.length - needle.length) !== -1;
	}

	function isVariable(sassFile) {
		return stringEndsWith(sassFile, "_variables.scss");
	}

	function isMixin(sassFile) {
		return stringEndsWith(sassFile, "_mixins.scss");
	}

	function isNormal(sassFile) {
		return !(stringEndsWith(sassFile, "_variables.scss") || stringEndsWith(sassFile, "_mixins.scss"));
	}

	function concatenateGenerator(path) {
		return function (fileName) {
			return path + fileName;
		};
	}

	ThemeSassExtractor.prototype.getSass = function () {
		var path, concatenatePath;
		var variables = [];
		var sass = [];
		var mixins = [];
		var push = Array.prototype.push;
		var aux;

		function splitSassFiles (type) {
			return function (item) {
				path = type + "/" + item.name + "/sass/";
				concatenatePath = concatenateGenerator(path);

				aux = item.sass.filter(isVariable).map(concatenatePath);
				push.apply(variables, aux);
				aux = item.sass.filter(isMixin).map(concatenatePath);
				push.apply(mixins, aux);
				aux = item.sass.filter(isNormal).map(concatenatePath);
				push.apply(sass, aux);
			}
		}

		this.themeInfo.addons.forEach(splitSassFiles('addons'));
		this.themeInfo.themes.forEach(splitSassFiles('themes'));

		return variables.concat(mixins).concat(sass);
	};

	return ThemeSassExtractor;
});
