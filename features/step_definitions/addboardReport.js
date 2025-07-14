const fs = require("fs");
const reporter = require("cucumber-html-reporter");
const jsonReportPath = "reports/addboard_report.json";

if (!fs.existsSync(jsonReportPath)) {
  console.error(
    `\nERROR: The report JSON file was not found at ${jsonReportPath}.\nPlease run 'npm run test:cucumber' first to generate the report data.\n`
  );
  process.exit(1);
}

const options = {
  theme: "bootstrap",
  jsonFile: jsonReportPath,
  output: "reports/addboard_report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    Browser: "Chrome",
    Platform: "Windows 10",
  },
};

reporter.generate(options);
