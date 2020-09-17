const
    { ArtifactArchiver } = require('@serenity-js/core'),
    { ConsoleReporter } = require('@serenity-js/console-reporter'),
    { Photographer, TakePhotosOfFailures, TakePhotosOfInteractions } = require('@serenity-js/protractor'),
    { SerenityBDDReporter } = require('@serenity-js/serenity-bdd'),
    isCI = require('is-ci');

exports.config = {
    baseUrl: 'http://localhost:3000',

    chromeDriver: require(`chromedriver/lib/chromedriver`).path,

    SELENIUM_PROMISE_MANAGER: false,

    directConnect: true,

    // https://github.com/angular/protractor/blob/master/docs/timeouts.md
    allScriptsTimeout: 110000,

    framework:      'custom',
    frameworkPath:  require.resolve('@serenity-js/protractor/adapter'),

    // specs: [ 'features/**/*.feature' ],
    specs: [ './spec/*.spec.ts', ],

    serenity: {
        // runner: 'cucumber',
        runner: 'jasmine',
        crew: [
            ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
            ConsoleReporter.forDarkTerminals(),
            Photographer.whoWill(TakePhotosOfFailures),     // or Photographer.whoWill(TakePhotosOfInteractions),
            new SerenityBDDReporter(),
        ]
    },

    /**
     * If you're interacting with a non-Angular application,
     * uncomment the below onPrepare section,
     * which disables Angular-specific test synchronisation.
     */
    onPrepare: function() {
        browser.waitForAngularEnabled(false);
    },

    /**
     * Cucumber-specific configuration,
     * which will be used if you configure serenity.runner to 'cucumber'
     */
    cucumberOpts: {
        require: [
            'features/**/*.ts',
        ],
        'require-module': [
            'ts-node/register'
        ],
        tags:    ['~@wip'],
        strict:  false,
    },

    /**
     * Jasmine-specific configuration,
     * which will be used if you configure serenity.runner to 'jasmine'
     */
    jasmineNodeOpts: {
        requires: [ 'ts-node/register' ],
        helpers: [
            'spec/support/*.ts'
        ]
    },

    capabilities: {
        browserName: 'chrome',

        // see https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities#loggingpreferences-json-object
        loggingPrefs: {
            browser: 'SEVERE' // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
        },

        chromeOptions: {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--log-level=3',
                '--disable-gpu',
                '--window-size=1920,1080',
                // '--headless',
            ].concat(isCI ? ['--headless'] : [])    // run in headless mode on the CI server
        }
    }
};
