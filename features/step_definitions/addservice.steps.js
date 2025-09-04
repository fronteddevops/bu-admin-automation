const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, After, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const path = require('path');
const os = require('os');
const chromedriver = require('chromedriver');
let driver;
let selectedGroup = "Admin Group11";
const emailToFind = "johnx4@example.com";
setDefaultTimeout(120 * 1000); 

Before( async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();
  
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});

Given('I am logged for Add Service', { timeout: 180000 }, async function () {
  await driver.get('http://192.168.29.131:5173/');
  const emailInput = await driver.wait(until.elementLocated(By.css("input[name='email'][placeholder='Email']")), 500);
  await driver.wait(until.elementIsVisible(emailInput), 10000);
  await emailInput.click();
  await emailInput.sendKeys("admin@gmail.com");
  await driver.sleep(1000);
  const passwordInput = await driver.wait(until.elementLocated(By.css("input[name='password'][placeholder='Password']")), 10000);
  await driver.wait(until.elementIsVisible(passwordInput), 5000);
  await passwordInput.click();
  await passwordInput.sendKeys("admin123");
  await driver.sleep(1000);
  const signInBtn = await driver.wait(until.elementLocated(By.id("kt_sign_in_submit")), 10000);
  await driver.wait(until.elementIsVisible(signInBtn), 5000);
  await driver.wait(until.elementIsEnabled(signInBtn), 5000);
  await signInBtn.click();
  await driver.sleep(2000);
});