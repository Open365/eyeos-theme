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

var sinon = require('sinon');
var assert = require('chai').assert;
var requirejs = require('requirejs');

var SassFetcher = requirejs('SassFetcher');

suite.skip('SassFetcher', function(){
	var sut;

	var sassFiles = {};

	var settings = {
		baseSassUrl: __dirname + '/../fakeData/',
		requireTextPath: __dirname + '/../../node_modules/requirejs-text/text'
	};
	var fetchSassCallbackSpy = sinon.spy();

	setup(function(){
		sut = new SassFetcher(settings);
	});

	suite('#fetchSass', function(){
		test('Fetch a list of sass files', function(done){
			var filesToFetch = [
				'addons/applications/sass/_variables.scss',
				'addons/startMenu/sass/_variables.scss'
			];
			sut.fetchSass(filesToFetch, function(err, css) {
				assert.equal(css, "$applications-color: green;$startmenu-class-color: green;");
				done();
			});
		});
	});
});
