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
const { dir } = require("console");
let driver;
setDefaultTimeout(120 * 1000);

Before(async function () {
  driver = await new Builder().forBrowser("chrome").build();
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
    await driver.get("http://192.168.29.67:5174/");
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
    await driver.sleep(1000);

    // Click on Flights
  }
);

Then("click on flight", async function () {
  const tourRadio = await driver.findElement(
    By.xpath("//input[@type='radio' and @id='Flight' and @value='Flight']")
  );
  await tourRadio.click();
  const yesButton = await driver.findElement(
    By.xpath(
      "//button[contains(@class, 'modal-success-button') and normalize-space(text())='Yes']"
    )
  );
  await driver.sleep(2000);
  await yesButton.click();
  await driver.sleep(1000);
});

Then("Enter Experience Code", async function () {
  const experienceCodeInput = await driver.findElement(
    By.xpath(
      "//label[contains(text(), 'Give your flight service a Code')]/following::input[1]"
    )
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    experienceCodeInput
  );

  await experienceCodeInput.clear();
  await experienceCodeInput.sendKeys("exp-789");
  await driver.sleep(1000);
});

Then("Enter Experience type", async function () {
  const labelexp = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='What is the Type of your Experience']"
      )
    ),
    10000
  );
  await driver.sleep(2000);

  const containerexp = await labelexp.findElement(
    By.xpath("ancestor::div[contains(@class, 'mb-3')]")
  );

  const selectControlexp = await containerexp.findElement(
    By.css(".css-13cymwt-control")
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    selectControlexp
  );
  await driver.sleep(500);
  await driver.executeScript("arguments[0].click();", selectControlexp);

  const inputexp = await selectControlexp.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  await inputexp.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await inputexp.sendKeys(Key.ENTER);

  await inputexp.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await inputexp.sendKeys(Key.ENTER);
});

Then("Select Theme That Describe Experice", async function () {
  const labelbestexp = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Choose the Themes that best describe your Experience']"
      )
    ),
    10000
  );
  await driver.sleep(2000);

  const containerbestexp = await labelbestexp.findElement(
    By.xpath("ancestor::div[contains(@class, 'mb-3')]")
  );

  const selectControlbestexp = await containerbestexp.findElement(
    By.css(".css-13cymwt-control")
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    selectControlbestexp
  );
  await driver.sleep(500);
  await driver.executeScript("arguments[0].click();", selectControlbestexp);

  const inputbestexp = await selectControlbestexp.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  await inputbestexp.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await inputbestexp.sendKeys(Key.ENTER);

  await inputbestexp.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await inputbestexp.sendKeys(Key.ENTER);
  await driver.sleep(1000);
});

Then("Select Categories That Describe Experience", async function () {
  const labelroomamenities = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Choose the Categories that best describe your Experience']"
      )
    ),
    10000
  );
  await driver.sleep(2000);

  const containeramenities = await labelroomamenities.findElement(
    By.xpath("ancestor::div[contains(@class, 'mb-3')]")
  );

  const selectControlamenities = await containeramenities.findElement(
    By.css(".css-13cymwt-control")
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    selectControlamenities
  );
  await driver.sleep(500);
  await driver.executeScript("arguments[0].click();", selectControlamenities);

  const inputamenities = await selectControlamenities.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  await inputamenities.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await inputamenities.sendKeys(Key.ENTER);

  await inputamenities.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await inputamenities.sendKeys(Key.ENTER);
  await driver.sleep(10000);
});

Then("Select Country , States, City, Post Code", async function () {
  // Choose a country:
  const countryLabel = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Choose a country:']")
  );

  const dropdownId = await countryLabel.getAttribute("for");
  const countryDropdown = await driver.findElement(By.id(dropdownId));
  const firstOption = await countryDropdown.findElement(
    By.xpath("./option[2]")
  );
  await firstOption.click();
});
