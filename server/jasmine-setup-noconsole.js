require('./globals');

var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
    savePath: "junitResults/",
    consolidateAll: false
});

jasmine.getEnv().addReporter(junitReporter);
