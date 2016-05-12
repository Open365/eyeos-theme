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

requirejs.config({
	nodeRequire: require,
	baseUrl: __dirname + "/../lib/",
	paths: {
		"platformReader": './readers/FSReader'
	}
});

var SassFetcher = requirejs('./SassFetcher');
var SassCompiler = requirejs('./SassCompiler');
var ThemeSassCompiler = requirejs('./ThemeSassCompiler');

suite('ThemeSassCompiler', function(){
	var sut;

	var files = [
		'sass/main.scss',
		'sass/_variables.scss'
	];
	var sassData = "$primary-color: #333; \
body { \
  color: $primary-color; \
}";
	var cssData = "body { \
  color: 333; \
}";

	var settings = {};
	var callback = sinon.spy();
	var sassFetcher, sassFetcherStub;
	var sassCompiler, sassCompilerStub;

	setup(function(){
		sassCompiler = new SassCompiler();
		sassCompilerStub = sinon.stub(sassCompiler);

		sassFetcher = new SassFetcher();
		sassFetcherStub = sinon.stub(sassFetcher);

		sassCompilerStub.compile.yields(false, cssData);
		sassFetcherStub.fetchSass.yields(false, sassData);

		sut = new ThemeSassCompiler(settings, sassFetcher, sassCompiler);
	});

	suite('#compile', function(){
		test('Should call SassFetcher.fetchSass forwarding the files argument', function () {
			sut.compile(files, callback);
			sinon.assert.calledWithExactly(sassFetcherStub.fetchSass, files, sinon.match.func);
		});
		test('Should forward to sassCompiler.compile the fetched sassData', function () {
			sut.compile(files, callback);
			sinon.assert.calledWith(sassCompilerStub.compile, sassData);
		});
		test('Should call .compile with the css result of sassCompiler', function () {
			sut.compile(files, callback);
			sinon.assert.calledWithExactly(callback, false, cssData);
		});
		test('If callback from sassFetcher.fetchSass contains an error, throw it', function () {
			var errorMessage = "super error";
			sassFetcherStub.fetchSass.yields(new Error(errorMessage));
			assert.throws(sut.compile, files, callback, errorMessage);
		});
	});
});