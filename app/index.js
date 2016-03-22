(function () {
	'use strict';

	var generators = require('yeoman-generator');
	var _ = require('underscore.string');

	module.exports = generators.Base.extend({
		constructor: function () {
			generators.Base.apply(this, arguments);
		},
		initializing: function () {
			this.pkg = require('../package.json');
		},
		prompting: function () {
			var done = this.async();

			this.prompt([{
				type: 'input',
				name: 'name',
				message: 'Project name',
				default: this.appname
			}, {
				type: 'list',
				name: 'buildSystem',
				message: 'Build system',
				choices: ['None', 'Grunt', 'Gulp'],
				default: 0
			}], function (answers) {
				this.log('Scaffolding your app now...');

				this.name = answers.name;
				this.buildSystem = answers.buildSystem;

				done();
			}.bind(this));
		},
		writing: function () {
			var that = this;
			var dirList = ['css', 'scss'];
			var fileList = ['demo.html', 'LICENSE.txt', 'README.md'];

			// Copy directories
			dirList.forEach(function (dirName) {
				that.fs.copy(
					that.templatePath(dirName + '/**/*'),
					that.destinationPath(dirName)
				);
			});

			// Copy files
			fileList.forEach(function (filename) {
				that.fs.copy(
					that.templatePath(filename),
					that.destinationPath(filename)
				);
			});

			if (this.buildSystem !== 'None') {
				// Copy package.json
				this.fs.copyTpl(
					this.templatePath('_package.json'),
					this.destinationPath('package.json'),
					{
						name: _.slugify(_.humanize(this.name)),
						buildSystem: this.buildSystem
					}
				);

				// Copy build system files
				if (this.buildSystem === 'Grunt') {
					this.fs.copy(
						this.templatePath('Gruntfile.js'),
						this.destinationPath('Gruntfile.js')
					);
				}

				if (this.buildSystem === 'Gulp') {
					this.fs.copy(
						this.templatePath('gulpfile.js'),
						this.destinationPath('gulpfile.js')
					);
				}
			}
		},
		install: function () {
			if (this.buildSystem !== 'None') {
				this.installDependencies();
			}
		}
	});
})();
