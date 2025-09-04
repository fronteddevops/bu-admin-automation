const { Builder, By, until } = require("selenium-webdriver");
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
let selectedGroup = "Admin Group11";
const emailToFind = "johnx4@example.com";
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

Given("I am logged for Add Service", { timeout: 180000 }, async function () {
  await driver.get("http://192.168.29.131:5173/");
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
});

Then("Click on Service", async function () {
  const settingsMenu = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//span[normalize-space(text())='Services']/ancestor::div[contains(@class, 'menu-accordian-list')]"
      )
    ),
    10000
  );
  await driver.sleep(300);
  await settingsMenu.click();
  await driver.sleep(1000);
});

// click on add service button
Then("Click on Add Service", async function () {
  const button = await driver.wait(
    until.elementLocated(By.xpath("//button[contains(., 'Add Services')]")),
    10000
  );
  await driver.wait(until.elementIsVisible(button), 5000);
  await button.click();
  await driver.sleep(2000);
});

// Click on Accomodotion
Then("Click on Accomodotion", async function () {
  const accommodationRadio = await driver.wait(
    until.elementLocated(By.id("Accommodation")),
    10000
  );

  await driver.wait(until.elementIsVisible(accommodationRadio), 5000);
  await driver.wait(until.elementIsEnabled(accommodationRadio), 5000);
  await accommodationRadio.click();
  await driver.sleep(2000);

  // Click on Yes Button
  const yesButton = await driver.wait(
    until.elementLocated(By.css("button.modal-success-button.btn.btn-primary")),
    10000
  );
  await driver.wait(until.elementIsVisible(yesButton), 5000);
  await driver.wait(until.elementIsEnabled(yesButton), 5000);
  await yesButton.click();
  await driver.sleep(2000);
});

// Enter Basic Code
Then("Select Basic and Enter Experience code", async function () {
  const codeInput = await driver.wait(
    until.elementLocated(By.id("experienceCode")),
    10000
  );
  await driver.wait(until.elementIsVisible(codeInput), 5000);
  await codeInput.click();
  await codeInput.sendKeys("exp-324");
  await driver.sleep(4000);
});

// Choose a Country
Then("Choose a Country", async function () {
  const select = await driver.findElement(By.id("country-0"));
  const option = await select.findElement(By.xpath("./option[3]"));
  await option.click();
  await driver.sleep(300);
});

Then("Choose a State", async function () {
  const select = await driver.findElement(
    By.xpath("//label[text()='Choose a State:']/following-sibling::select")
  );
  const option = await select.findElement(By.xpath("./option[2]"));
  await option.click();
  await driver.sleep(1000);
});

Then("Choose a City", async function () {
  const select = await driver.findElement(
    By.xpath("//label[text()='Choose a City:']/following-sibling::select")
  );
  const option = await select.findElement(By.xpath("./option[2]"));
  await option.click();
  await driver.sleep(300);
});

//click on Save and Next

Then("Click on Save and Next", async function () {
  const button = await driver.findElement(
    By.xpath("//button[normalize-space(text())='Save and Next']")
  );
  await button.click();
  await driver.sleep(300);
});

Then("Media and Description", async function () {
  const placeholder = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[@class='css-1jqq78o-placeholder' and normalize-space()='Select genres...']"
      )
    ),
    10000
  );

  const dropdownControls = await placeholder.findElement(
    By.xpath("ancestor::div[contains(@class, 'css-13cymwt-control')]")
  );

  await dropdownControls.click();
  const firstOption = await driver.wait(
    until.elementLocated(By.css("[id^='react-select'][id$='-option-0']")),
    5000
  );
  await firstOption.click();
  await driver.sleep(300);

  const button = await driver.findElement(
    By.xpath("//button[normalize-space(text())='Save and Next']")
  );
  await button.click();
  await driver.sleep(300);
});

Then("Click on Just Date not time", async function () {
  const radio = await driver.findElement(
    By.css("input[type='radio'][value='Only_Date']")
  );
  await radio.click();
  await driver.sleep(300);
  const button = await driver.findElement(
    By.xpath("//button[normalize-space()='Save']")
  );
  await button.click();
  await driver.sleep(300);
  const buttons = await driver.findElement(
    By.xpath("//button[normalize-space()='Save']")
  );
  await buttons.click();

  await driver.sleep(500);
});

Then("Experience Start Time", async function () {
  const addTimeButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[normalize-space(text())='Add Start - Time / Duration' and contains(@class, 'primary-btn')]"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(addTimeButton), 5000);
  await driver.wait(until.elementIsEnabled(addTimeButton), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    addTimeButton
  );
  await driver.sleep(200);

  await addTimeButton.click();

  // click on Start time
  const checkInTimeInput = await driver.wait(
    until.elementLocated(By.id("start-time")),
    10000
  );

  await driver.wait(until.elementIsVisible(checkInTimeInput), 5000);
  await driver.wait(until.elementIsEnabled(checkInTimeInput), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    checkInTimeInput
  );
  await driver.sleep(200);
  await checkInTimeInput.click();
  await checkInTimeInput.sendKeys("10:30");

  await driver.sleep(2000);

  // Click on hour
  const checkOutTimeInput = await driver.wait(
    until.elementLocated(By.id("hour")),
    10000
  );

  await driver.wait(until.elementIsVisible(checkOutTimeInput), 5000);
  await driver.wait(until.elementIsEnabled(checkOutTimeInput), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    checkOutTimeInput
  );
  await driver.sleep(200);
  await checkOutTimeInput.click();
  await checkOutTimeInput.sendKeys("10");

  await driver.sleep(500);

  const checkminuteInput = await driver.wait(
    until.elementLocated(By.id("minutes")),
    10000
  );

  await driver.wait(until.elementIsVisible(checkminuteInput), 5000);
  await driver.wait(until.elementIsEnabled(checkminuteInput), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    checkminuteInput
  );
  await driver.sleep(200);
  await checkminuteInput.click();
  await checkminuteInput.sendKeys("20");

  await driver.sleep(500);

  // click on save button
  const saveButtons = await driver.wait(
    until.elementLocated(By.css("button.modal-success-button")),
    3000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtons
  );

  await saveButtons.click();

  await driver.sleep(300);
  const buttons = await driver.findElement(
    By.xpath("//button[normalize-space()='Save']")
  );
  await buttons.click();
  await driver.sleep(10000);
});

Then("Click on Add Avaibility", async function () {
  const addAvailabilityBtn = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[normalize-space(text())='Add Availability' and contains(@class, 'primary-btn')]"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(addAvailabilityBtn), 5000);
  await driver.wait(until.elementIsEnabled(addAvailabilityBtn), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    addAvailabilityBtn
  );
  await driver.sleep(200);
  await addAvailabilityBtn.click();
  const dropdownInput = await driver.findElement(
    By.xpath(
      "//label[normalize-space()='Select the Type of Availability Rule']/following::input[1]"
    )
  );

  await dropdownInput.click();

  const firstOption = await driver.wait(
    until.elementLocated(
      By.xpath("//div[contains(@class,'menu')]//div[@role='option'][1]")
    ),
    5000
  );

  await firstOption.click();
  await driver.sleep(10000);
});
