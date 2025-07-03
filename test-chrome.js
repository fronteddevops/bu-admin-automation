const { Builder } = require('selenium-webdriver');
(async function test() {
  try {
    console.log('Launching Chrome with Selenium...');
    let driver = await new Builder().forBrowser('chrome').build();
    console.log('Chrome launched. Navigating to Google...');
    await driver.get('https://www.google.com');
    console.log('Navigation successful. Closing browser...');
    await driver.quit();
    console.log('Browser closed. Selenium test successful.');
  } catch (error) {
    console.error('Selenium test failed:', error);
  }
})(); 