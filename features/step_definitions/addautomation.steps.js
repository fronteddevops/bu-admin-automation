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

Given("I am logged for Automation", { timeout: 180000 }, async function () {
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

When("Click on Add Automations", async function () {
  const addToWhatsAppButton = await driver.wait(
    until.elementLocated(By.xpath("//button[text()='Add Automations']")),
    10000
  );
  await addToWhatsAppButton.click();
  await driver.sleep(1000);
});

When("Click on Create Button", async function () {
  const createButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[normalize-space()='Create' and contains(@class, 'bg-blue-500')]"
      )
    ),
    10000
  );
  await createButton.click();
  await driver.sleep(1000);
});

When("Enter Title", async function () {
  const titleInput = await driver.wait(
    until.elementLocated(By.id("Rule")),
    10000
  );
  await titleInput.click();
  await titleInput.sendKeys("Trip Rule Title");
  await driver.sleep(1000);
});

When("Select When", async function () {
  const whenDropdown = await driver.wait(
    until.elementLocated(By.css("select.w-\\[270px\\]")),
    10000
  );

  await whenDropdown.click();
  await whenDropdown.sendKeys(Key.ARROW_DOWN);
  await whenDropdown.sendKeys(Key.ENTER);
  await driver.sleep(1000);
});

When("Select If", async function () {
  const firstSelect = await driver.wait(
    until.elementLocated(
      By.xpath("(//span[text()='if']/following::select)[1]")
    ),
    10000
  );
  await firstSelect.click();
  await firstSelect.sendKeys(Key.ARROW_DOWN, Key.ENTER);

  const boardSelect = await driver.wait(
    until.elementLocated(
      By.xpath("(//span[text()='if']/following::select)[3]")
    ),
    10000
  );
  await boardSelect.click();
  await boardSelect.sendKeys(Key.ARROW_DOWN, Key.ENTER);
  await driver.sleep(1000);
});

When("Select And", async function () {
  const firstAndSelect = await driver.wait(
    until.elementLocated(
      By.xpath("(//span[text()='and']/following::select)[1]")
    ),
    10000
  );
  await firstAndSelect.click();
  await firstAndSelect.sendKeys(Key.ARROW_DOWN, Key.ENTER);

  const listSelect = await driver.wait(
    until.elementLocated(
      By.xpath("(//span[text()='and']/following::select)[3]")
    ),
    10000
  );
  await listSelect.click();
  await listSelect.sendKeys(Key.ARROW_DOWN, Key.ENTER);
  await driver.sleep(1000);
  const gmailSelect = await driver.wait(
    until.elementLocated(
      By.xpath("//select[option[text()='Select Gmail User']]")
    ),
    10000
  );

  await gmailSelect.click();
  await gmailSelect.sendKeys(Key.ARROW_DOWN);
  await gmailSelect.sendKeys(Key.ENTER);
});

When("Select Then", async function () {
  const thenSelect = await driver.wait(
    until.elementLocated(
      By.xpath("(//span[text()='Then']/following::select)[2]")
    ),
    10000
  );

  await thenSelect.click();
  await thenSelect.sendKeys(Key.ARROW_DOWN);
  await thenSelect.sendKeys(Key.ENTER);
  await driver.sleep(10000);
});

When("Click on Create", async function () {
  const createButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[normalize-space()='Create' and contains(@class, 'bg-blue-500')]"
      )
    ),
    10000
  );
  await createButton.click();
});
