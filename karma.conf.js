// karma.conf.js
const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
     frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'), // Add the coverage plugin
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      // Your files here
    ],
    reporters: ['progress', 'kjhtml', 'coverage'], // Add 'coverage' to reporters
    coverageReporter: {
      dir: path.join(__dirname, './coverage/1-progetto-angular-jessica-dabennini>'), // Replace <project-name> with your actual project name
      subdir: '.',
      type : 'text',
      dir : 'coverage/',
      file : 'coverage.txt',
      includeAllSources: true,
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 60,
          branches: 60,
          functions: 60,
          lines: 60
        }
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};