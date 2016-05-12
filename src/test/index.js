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

var requirejs = require('requirejs');
require('amdefine/intercept');

requirejs.config({
	nodeRequire: require,
	baseUrl: __dirname + "/../lib/",
	paths: {
		"platformReader": './readers/FSReader',
		"text": __dirname + '/../../node_modules/requirejs-text/text'
	}
});

var Mocha = require('mocha'),
	fs = require('fs'),
	path = require('path');

// First, you need to instantiate a Mocha instance.
var mocha = new Mocha({
	"ui": "tdd",
	"reporter": "spec"
});

// Then, you need to use the method "addFile" on the mocha
// object for each file.

var includeFiles = [];

// Here is an example:
fs.readdirSync(__dirname).filter(function (file) {
	// Only keep the .js files
	return file.substr(-3) === '.js';

}).forEach(function (file) {
	// Use the method "addFile" to add the file to mocha
	includeFiles.push(path.join(__dirname, file));
	mocha.addFile(
		path.join(__dirname, file)
	);
});

mocha.ui("tdd").run(function (failures) {
	process.on('exit', function () {
		process.exit(failures);
	});
});
