require('./globals');


var JasmineConsoleReporter = require('jasmine-console-reporter');
var consoleReporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: false
});
jasmine.getEnv().addReporter(consoleReporter);

var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
    savePath: "junitResults/",
    consolidateAll: false
});

jasmine.getEnv().addReporter(junitReporter);

// adding reporters so the junit test results will be created in the folder junitResults
