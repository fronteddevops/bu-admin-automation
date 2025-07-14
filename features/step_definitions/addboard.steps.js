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
const clientName = "testingkanban";
const emailToFind = "johnx4@example.com";
const isExistingClient = false;
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

Given("I am logged for Board", { timeout: 180000 }, async function () {
  await driver.get("http://localhost:3000");

  const selectEmail = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Email Address']")
    ),
    10000
  );
  const selectInput = await selectEmail.findElement(
    By.xpath("following-sibling::input")
  );
  await selectInput.sendKeys("admin@gmail.com");
  await driver.sleep(1000);

  // Enter Password

  const passwordLabel = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Password']")
    ),
    10000
  );

  const parentDiv = await passwordLabel.findElement(By.xpath(".."));
  const passwordInput = await parentDiv.findElement(
    By.xpath(".//input[@type='password']")
  );
  await passwordInput.sendKeys("admin123");
  await driver.sleep(1000);

  // click on Submit
  const submitButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[normalize-space(text())='Submit']")
    ),
    10000
  );

  await submitButton.click();
  await driver.sleep(3000);
});

When("Click on Setting Icon", async function () {
  const gearIconDiv = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class, 'border-blue-400') and contains(@class, 'rounded-lg')]"
      )
    ),
    10000
  );

  await gearIconDiv.click();
  await driver.sleep(1000);
});

When("Click on Add Board", async function () {
  const addBoardElement = await driver.wait(
    until.elementLocated(By.xpath("//span[normalize-space()='Add Board']")),
    10000
  );
  await addBoardElement.click();

  await driver.sleep(1000);
});

When("Enter Board Name", async function () {
  const boardNameInput = await driver.wait(
    until.elementLocated(
      By.css("input.board-name-input[placeholder='Board Name']")
    ),
    10000
  );

  await boardNameInput.click();
  await boardNameInput.sendKeys("My New Board");
  await driver.sleep(10000);
});

When("Click on Save Button", async function () {
  const saveButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[normalize-space()='Save' and contains(@class, 'btn-primary')]"
      )
    ),
    10000
  );
  await saveButton.click();
});
