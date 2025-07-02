const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
let driver;

Before(async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();
});

Given('I am on the login page', async function () {
  await driver.get('http://192.168.29.67:5173/kanban');
  await driver.sleep(3000);
});

When('I enter the email {string}', async function (email) {
  const emailInput = await driver.wait(until.elementLocated(By.css("input[name='email'][placeholder='Email']")), 10000);
  await driver.wait(until.elementIsVisible(emailInput), 5000);
  await emailInput.click();
  await emailInput.sendKeys(email);
  await driver.sleep(1000);
});

When('I enter the password {string}', async function (password) {
  const passwordInput = await driver.wait(until.elementLocated(By.css("input[name='password'][placeholder='Password']")), 10000);
  await driver.wait(until.elementIsVisible(passwordInput), 5000);
  await passwordInput.click();
  await passwordInput.sendKeys(password);
  await driver.sleep(1000);
  const eyeIcon = await driver.findElement(By.className('fa-eye'));
  await driver.wait(until.elementIsVisible(eyeIcon), 5000);
  await eyeIcon.click();
  await driver.sleep(500);
});

When('I click the sign in button', async function () {
  const signInButton = await driver.findElement(By.id('kt_sign_in_submit'));
  await driver.wait(until.elementIsVisible(signInButton), 5000);
  await signInButton.click();
  await driver.sleep(2000);
});

When('I navigate to the Settings menu', async function () {
  const setting = await driver.wait(until.elementLocated(By.xpath("//span[contains(@class, 'menu-title') and normalize-space(text())='Settings']")), 10000);
  await setting.click();
  await driver.sleep(1000);
});

When('I navigate to the Age Range menu', async function () {
  const ageRange = await driver.wait(until.elementLocated(By.xpath("//span[contains(@class, 'menu-title') and normalize-space(text())='Age Range']")), 10000);
  await ageRange.click();
  await driver.sleep(1000);
});

When('I navigate to the Trip Request menu', async function () {
  const tripRequest = await driver.wait(until.elementLocated(By.xpath("//span[contains(@class, 'menu-title') and normalize-space(text())='Trip Request']")), 10000);
  await tripRequest.click();
  await driver.sleep(1000);
});

When('I search for {string}', async function (searchTerm) {
  const searchBox = await driver.wait(until.elementLocated(By.css('.triplist-search-field-box')), 10000);
  const input = await searchBox.findElement(By.css("input[name='search'][placeholder='Search...']"));
  await driver.wait(until.elementIsVisible(input), 5000);
  await input.click();
  await input.sendKeys(searchTerm);
  await driver.sleep(1000);
});

Then('I should see the search results', async function () {
  // You can add an assertion here if you know what to check for
  await driver.sleep(2000);
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
}); 