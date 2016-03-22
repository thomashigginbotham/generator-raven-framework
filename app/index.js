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
			}, {
				type: 'confirm',
				name: 'linters',
				message: 'Include common linting configurations',
				default: true
			}], function (answers) {
				this.log('Scaffolding your app now...');

				this.name = answers.name;
				this.buildSystem = answers.buildSystem;
				this.linters = answers.linters;

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
			if (this.linters) {
				fileList = fileList.concat(['.editorconfig', '.htmlhintrc', '.jscsrc', '.jshintrc', '.scss-lint.yml']);
			}

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
						buildSystem: this.buildSystem,
						linters: this.linters
					}
				);

				// Copy build system files
				if (this.buildSystem === 'Grunt') {
					this.fs.copyTpl(
						this.templatePath('_Gruntfile.js'),
						this.destinationPath('Gruntfile.js'),
						{
							linters: this.linters
						}
					);
				}

				if (this.buildSystem === 'Gulp') {
					this.fs.copyTpl(
						this.templatePath('_gulpfile.js'),
						this.destinationPath('gulpfile.js'),
						{
							linters: this.linters
						}
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
