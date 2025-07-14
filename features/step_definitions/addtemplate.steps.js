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

Given("I am logged for Add Template", { timeout: 180000 }, async function () {
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

When("Click on Template", async function () {
  const addToWhatsAppButton = await driver.wait(
    until.elementLocated(By.xpath("//button[text()='Template']")),
    10000
  );
  await addToWhatsAppButton.click();
  await driver.sleep(1000);
});

When("Click on Add Template", async function () {
  const addButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[normalize-space()='Add Template']")
    ),
    10000
  );
  await addButton.click();
});

When("Enter Template Name", async function () {
  const templateInput = await driver.wait(
    until.elementLocated(
      By.xpath("//label[text()='Template Name']/following-sibling::input")
    ),
    10000
  );
  await templateInput.sendKeys("Your Template Name");
  await driver.sleep(2000);
});

When("Enter Subject", async function () {
  const subjectInput = await driver.wait(
    until.elementLocated(
      By.xpath("//label[text()='Subject']/following-sibling::input")
    ),
    10000
  );
  await subjectInput.sendKeys("Your Subject Here");
  await driver.sleep(2000);
});

When("Enter Template Data", async function () {
  const editor = await driver.wait(
    until.elementLocated(By.css("div[contenteditable='true'][role='textbox']")),
    10000
  );
  await editor.click();
  await editor.sendKeys("This is my email body content.");
  await driver.sleep(1000);
});

When("Click on Save Changes", async function () {
  const saveButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[normalize-space()='Save changes']")
    ),
    10000
  );
  await saveButton.click();
  await driver.sleep(10000);
});

When("Delete Template", async function () {
  const deleteButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//td[text()='Your Template Name']/parent::tr//img[@alt='delete']/parent::button"
      )
    ),
    10000
  );
  await deleteButton.click();
  const logs = await driver.manage().logs().get('browser');
  await driver.sleep(5000);
});

When("Click on Delete Button", async function () {
  const confirmDeleteButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[normalize-space()='Delete' and contains(@class, 'bg-[#42B4F4]')]"
      )
    ),
    10000
  );
  await confirmDeleteButton.click();
  await driver.sleep(5000)
});
