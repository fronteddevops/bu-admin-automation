const { Builder, By, Key, until } = require("selenium-webdriver");
const {
  Given,
  When,
  Then,
  After,
  Before,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const path = require("path");
const os = require("os");
const chromedriver = require("chromedriver");
let driver;
setDefaultTimeout(120 * 1000);

Before(async function () {
  console.log("Launching browser...");
  driver = await new Builder().forBrowser("chrome").build();
  console.log("Browser launched.");
  await driver.manage().window().maximize();
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});

Given(
  "I am logged in as admin flights",
  { timeout: 180000 },
  async function () {
    await driver.get("http://192.168.29.67:5173/kanban");
    const emailInput = await driver.wait(
      until.elementLocated(By.css("input[name='email'][placeholder='Email']")),
      500
    );
    await driver.wait(until.elementIsVisible(emailInput), 10000);
    await emailInput.click();
    await emailInput.sendKeys("admin@gmail.com");
    await driver.sleep(1000);
    const passwordInput = await driver.wait(
      until.elementLocated(
        By.css("input[name='password'][placeholder='Password']")
      ),
      10000
    );
    await driver.wait(until.elementIsVisible(passwordInput), 5000);
    await passwordInput.click();
    await passwordInput.sendKeys("admin123");
    await driver.sleep(1000);
    const signInBtn = await driver.wait(
      until.elementLocated(By.id("kt_sign_in_submit")),
      10000
    );
    await driver.wait(until.elementIsVisible(signInBtn), 5000);
    await driver.wait(until.elementIsEnabled(signInBtn), 5000);
    await signInBtn.click();
    await driver.sleep(2000);

    // click on product

    let productsMenu = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[contains(@class, 'menu-accordian-list')]//span[normalize-space(text())='Products']"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      productsMenu
    );
    await driver.wait(until.elementIsVisible(productsMenu), 5000);
    await driver.wait(until.elementIsEnabled(productsMenu), 5000);
    await productsMenu.click();
    await driver.sleep(1000);

    // Click on Add Product
    let addProductsButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[contains(@class, 'primary-btn') and contains(., 'Add Products')]"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      addProductsButton
    );

    await driver.wait(until.elementIsVisible(addProductsButton), 5000);
    await driver.wait(until.elementIsEnabled(addProductsButton), 5000);
    await addProductsButton.click();
    await driver.sleep(1000)

    // Click on Flights
  }
);
