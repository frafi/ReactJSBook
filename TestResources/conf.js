// conf.js

var HtmlReporter = require('protractor-jasmine2-screenshot-reporter');

var today = new Date(),
    timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';


var reporter = new HtmlReporter({
  cleanDestination: false,
  showSummary: true,
  showConfiguration: true,
  showQuickLinks: true,
  reportTitle: "React App Asset manager -- Test run on: " + timeStamp,	
  dest: 'target/Reports',
  filename: 'my-report.html',
  pathBuilder: function(currentSpec, suites, browserCapabilities) {
    // will return chrome/your-spec-name.png
    return browserCapabilities.get('browserName') + '/' + currentSpec.fullName+'_'+timeStamp;
  }
});

exports.config = {

	// Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
   },

   framework: 'jasmine',
   seleniumAddress: 'http://localhost:4444/wd/hub',
   specs: ['spec.js'],


   jasmineNodeOpts: {
		  defaultTimeoutInterval: 60000,
		  includeStackTrace: true
	 },

 }

