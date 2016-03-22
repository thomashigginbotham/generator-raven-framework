module.exports = function (grunt) {
	'use strict';

	// Configuration
	grunt.initConfig({
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/main.css': 'scss/main.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/main.min.css': 'scss/main.scss'
				}
			}
		},<% if (linters) { %>
		htmlhint: {
			options: {
				htmlhintrc: '.htmlhintrc'
			},
			all: {
				src: ['html/**/*.html']
			}
		},
		scsslint: {
			options: {
				config: '.scss-lint.yml',
				colorizeOutput: true
			},
			all: ['scss/**/*.scss']
		},
		jshint: {
			options: {
				jshintrc: true
			},
			all: ['Gruntfile.js', 'js/**/*.js']
		},
		jscs: {
			options: {
				config: '.jscsrc'
			},
			all: ['Gruntfile.js', 'js/**/*.js']
		},
		<% } %>watch: {
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false,
					atBegin: true
				}
			}
		}
	});

	// Tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');<% if (linters) { %>
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');<% } %>

	grunt.registerTask('default', ['sass:dist']);<% if (linters) { %>
	grunt.registerTask('lint', ['htmlhint:all', 'scsslint:all', 'jshint:all', 'jscs:all']);<% } %>
};
