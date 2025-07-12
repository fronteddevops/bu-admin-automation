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

Given("I am logged", { timeout: 180000 }, async function () {
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

When("Click on User Management", async function () {
  const addToWhatsAppButton = await driver.wait(
    until.elementLocated(By.xpath("//button[text()='User management']")),
    10000
  );
  await addToWhatsAppButton.click();
  await driver.sleep(2000);
});

When("Click on Add Button", async function () {
  const rows = await driver.findElements(By.css("table tbody tr"));

  for (const row of rows) {
    const cells = await row.findElements(By.css("td"));
    const emailCellText = await cells[2].getText();

    if (emailCellText.trim() === emailToFind) {
      const addButton = await row.findElement(By.css("button.table-icon-add"));
      await driver.wait(until.elementIsVisible(addButton), 2000);
      await driver.wait(until.elementIsEnabled(addButton), 2000);
      await addButton.click();
      await driver.sleep(2000);
      // console.log(`Clicked add button for ${emailToFind}`);

      break;
    }
  }
});

When("Select first Board under New Assignment", async function () {
  const newAssignmentLabel = await driver.findElement(
    By.xpath("//div[contains(text(),'New Assignment')]")
  );

  const parentContainer = await newAssignmentLabel.findElement(
    By.xpath(
      "following::div[contains(@class,'form-item') and .//div[text()='Board']][1]"
    )
  );

  const boardDropdown = await parentContainer.findElement(
    By.css(".react-dropdown-select")
  );
  await boardDropdown.click();

  await driver.sleep(1000);
  const options = await driver.findElements(
    By.css(".react-dropdown-select-dropdown .react-dropdown-select-item")
  );

  if (options.length === 0) {
    throw new Error("No board options available under New Assignment");
  }

  await options[0].click();
});

When("Select Column under New Assignment", async function () {
  const newAssignmentLabel = await driver.findElement(
    By.xpath("//div[contains(text(),'New Assignment')]")
  );

  const columnContainer = await newAssignmentLabel.findElement(
    By.xpath(
      "following::div[contains(@class,'form-item') and .//div[text()='Column']][1]"
    )
  );

  const dropdown = await columnContainer.findElement(
    By.css(".dropdown-container")
  );
  await dropdown.click();

  await driver.sleep(1000);

  const options = await driver.findElements(
    By.css(".rmsc .dropdown-content .select-item")
  );

  for (let i = 0; i < options.length; i++) {
    const text = await options[i].getText();
    console.log(`Option ${i}: ${text}`);
  }

  if (options.length <= 1) {
    throw new Error("No valid column options found (besides 'Select All').");
  }

  const itemsToSelect = Math.min(options.length - 1, 2);
  for (let i = 1; i <= itemsToSelect; i++) {
    await options[i].click();
    await driver.sleep(300);
  }
});

When("Click on Save Button", async function () {
  const saveButton = await driver.wait(
    until.elementLocated(By.css(".save-item .btn.btn-primary")),
    5000
  );
  await driver.wait(until.elementIsVisible(saveButton), 5000);
  await driver.wait(until.elementIsEnabled(saveButton), 5000);
  await saveButton.click();
  await driver.sleep(10000);
});
