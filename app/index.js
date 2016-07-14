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
			var dirList = ['scss', 'fonts', 'js', 'images'];
			var rootFileList = [
				'LICENSE.txt',
				'README.md'
			];
			var appFileList = [
				'android-chrome-192x192.png',
				'apple-touch-icon.png',
				'browserconfig.xml',
				'favicon-16x16.png',
				'favicon-32x32.png',
				'favicon.ico',
				'manifest.json',
				'mstile-150x150.png',
				'safari-pinned-tab.svg'
			];

			// Copy directories
			if (this.buildSystem === 'None') {
				dirList = dirList.concat(['css']);
			}

			dirList.forEach(function (dirName) {
				that.fs.copy(
					that.templatePath(dirName + '/**/*'),
					that.destinationPath('app/' + dirName)
				);
			});

			// Copy files
			if (this.linters) {
				rootFileList = rootFileList.concat(['.editorconfig', '.htmlhintrc', '.jscsrc', '.jshintrc', '.scss-lint.yml']);
			}

			rootFileList.forEach(function (filename) {
				that.fs.copy(
					that.templatePath(filename),
					that.destinationPath(filename)
				);
			});

			appFileList.forEach(function (filename) {
				that.fs.copy(
					that.templatePath(filename),
					that.destinationPath('app/' + filename)
				);
			});

			// Copy index.html
			this.fs.copyTpl(
				this.templatePath('_index.html'),
				this.destinationPath('app/index.html'),
				{
					name: this.name,
					linters: this.linters
				}
			);

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
				this.installDependencies({
					callback: function () {
						if (this.buildSystem === 'Grunt') {
							this.spawnCommand('grunt', ['serve']);
						} else if (this.buildSystem === 'Gulp') {
							this.spawnCommand('gulp', ['serve']);
						}
					}.bind(this)
				});
			}
		}
	});
})();
