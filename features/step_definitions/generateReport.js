const fs = require('fs');
const reporter = require('cucumber-html-reporter');

const jsonReportPath = 'reports/adduser_report.json';
const jsonReportPathtour = 'reports/tour_report.json';

if (!fs.existsSync(jsonReportPath)) {
  console.error(`\nERROR: The report JSON file was not found at ${jsonReportPath}.\nPlease run 'npm run test:cucumber' first to generate the report data.\n`);
  process.exit(1);
}
if (!fs.existsSync(jsonReportPathtour)) {
  console.error(`\nERROR: The report JSON file was not found at ${jsonReportPathtour}.\nPlease run 'npm run test:cucumber' first to generate the report data.\n`);
  process.exit(1);
}

const options = {
  theme: 'bootstrap',
  jsonFile: jsonReportPath,
  output: 'reports/adduser_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version":"1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chrome",
    "Platform": "Windows 10"
  }
};
// const optionsAddtour = {
//   theme: 'bootstrap',
//   jsonFile: jsonReportPathtour,
//   output: 'reports/tour_report.html',
//   reportSuiteAsScenarios: true,
//   launchReport: true,
//   metadata: {
//     "App Version":"1.0.0",
//     "Test Environment": "STAGING",
//     "Browser": "Chrome",
//     "Platform": "Windows 10"
//   }
// };

reporter.generate(options); 
// reporter.generate(optionsAddtour); 