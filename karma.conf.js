const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['test/**/*.spec.ts', 'src/sliderLogic.ts'],
        exclude: ['node_modules', 'src/index.ts'],
        reporters: ['progress', 'coverage'],
        preprocessors: {
            'test/**/*.ts': ['webpack'],
            'src/sliderLogic.ts': ['webpack', 'coverage'],
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            mode: webpackConfig.mode,
            devtool: 'inline-source-map',
        },
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        },
        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    });
};