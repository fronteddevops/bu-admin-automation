const { Builder, By, Key, until } = require("selenium-webdriver");
const {
  Given,
  When,
  Then,
  After,
  Before,

  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { Select } = require("selenium-webdriver/lib/select");
const path = require("path");
const os = require("os");
const chromedriver = require("chromedriver");
const { dir } = require("console");
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

Given("I am logged in For add trip", { timeout: 180000 }, async function () {
  // await driver.get("http://192.168.29.131:5173/");
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
  await driver.sleep(1000);
});

Then("Click on Trip", async function () {
  const settingsMenu = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//span[normalize-space(text())='Trip']/ancestor::div[contains(@class, 'menu-accordian-list')]"
      )
    ),
    10000
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    settingsMenu
  );
  await driver.sleep(300);
  await settingsMenu.click();
  await driver.sleep(1000);

  // click on Add Trip

  const addTripButton = await driver.findElement(
    By.xpath("//button[contains(., 'Add Trip')]")
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    addTripButton
  );
  await addTripButton.click();
  await driver.sleep(1000);
});

Then("Add Trip", async function () {
  // Enter Title
  const titleInput = await driver.findElement(
    By.css("input[placeholder='Enter Trip Title']")
  );

  await titleInput.clear();
  await titleInput.sendKeys("My First Trip");
  await driver.sleep(1000);

  // Open dropdown and select tour guide language
  const dropdown = await driver.findElement(
    By.css(".rmsc .dropdown-container")
  );
  await dropdown.click();

  await driver.wait(until.elementLocated(By.css(".rmsc .options")), 10000);

  const checkboxes = await driver.findElements(
    By.css(".rmsc .options input[type='checkbox']")
  );

  await checkboxes[1].click();
  await dropdown.click();
  await driver.sleep(1000);

  // Enter Client Budget
  const budgetInput = await driver.findElement(
    By.css("input[placeholder='Clients Budget']")
  );

  await budgetInput.clear();
  await budgetInput.sendKeys("4545");

  // select prospect
  const selectElement = await driver.wait(
    until.elementLocated(By.css("select.form-control")),
    5000
  );

  const select = new Select(selectElement);
  await select.selectByIndex(1);
  await driver.sleep(1000);

  // select destinations
  const labelElement = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Select Destinations']")
  );

  const destinationsDropdown = await labelElement.findElement(
    By.xpath(
      "./following::div[contains(@class,'rmsc')][1]//div[@class='dropdown-container']"
    )
  );

  await destinationsDropdown.click();
  const firstOption = await driver.wait(
    until.elementLocated(
      By.xpath(
        "(//div[contains(@class,'rmsc')]//div[@class='dropdown-content']//span)[2]"
      )
    ),
    5000
  );

  await firstOption.click();
  await driver.sleep(1000);

  // Select Starting Date
  const labelElements = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Starting Date']")
  );

  const dateInput = await labelElements.findElement(
    By.xpath("./following::input[@placeholder='Select a date'][1]")
  );

  await dateInput.click();
  await driver.wait(until.elementLocated(By.css(".react-datepicker")), 5000);

  const dateToSelect = await driver.findElement(
    By.xpath("//div[contains(@class,'react-datepicker__day') and text()='5']")
  );

  await dateToSelect.click();

  // select end date
  const labelElementdateEnd = await driver.findElement(
    By.xpath("//label[normalize-space(text())='End Date']")
  );

  const dateInputdateEnd = await labelElementdateEnd.findElement(
    By.xpath("./following::input[@placeholder='Select a date'][1]")
  );

  await dateInputdateEnd.click();
  await driver.wait(until.elementLocated(By.css(".react-datepicker")), 5000);

  const dateToSelectdateEnd = await driver.findElement(
    By.xpath("//div[contains(@class,'react-datepicker__day') and text()='10']")
  );

  await dateToSelectdateEnd.click();

  // Select Status
  const salesStatusLabel = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Sales Status']")
  );

  const salesStatusDropdown = await salesStatusLabel.findElement(
    By.xpath("./following::select[1]")
  );

  const firstSalesStatusOption = await salesStatusDropdown.findElement(
    By.xpath("./option[1]")
  );
  await firstSalesStatusOption.click();

  // select trip type
  const tripTypeLabel = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Trip Type']")
  );

  const tripTypeDropdown = await tripTypeLabel.findElement(
    By.xpath("./following::select[1]")
  );

  const firstTripTypeOption = await tripTypeDropdown.findElement(
    By.xpath("./option[not(@disabled)][1]")
  );

  await firstTripTypeOption.click();

  const showPriceLabel = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Show price to customer']")
  );

  const showPriceCheckbox = await showPriceLabel.findElement(
    By.xpath("./following::input[@type='checkbox'][1]")
  );

  await showPriceCheckbox.click();
  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    showPriceLabel
  );

  // Click on checkbox
//   const checkbox = await driver.findElement(By.css("input.form-check-input"));
//   await checkbox.click();
//   await driver.sleep(1000);

  // Enter name
  const nameLabel = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Name']")
  );

  const nameInput = await nameLabel.findElement(
    By.xpath("./following::input[1]")
  );

  await nameInput.sendKeys("John Doe");
  await driver.sleep(1000);

  // Enter Age
  const ageLabel = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Age']")
  );

  const ageInput = await ageLabel.findElement(
    By.xpath("./following::input[1]")
  );

  await ageInput.sendKeys("25");
  await driver.sleep(1000);

  // click on next button
  const nextButton = await driver.findElement(
    By.xpath("//button[normalize-space(text())='Next']")
  );

  await nextButton.click();
  await driver.sleep(20000);
});

Then("add trip drap and drop", async function(){
    try {
  const draggable = await driver.findElement(
    By.xpath("//p[normalize-space(text())='test acc 17']/ancestor::div[contains(@class,'border')]")
  );

  const dropTarget = await driver.findElement(By.id("tour-column"));
  const actions = driver.actions({ bridge: true });
  await actions.dragAndDrop(draggable, dropTarget).perform();
  console.log("Drag and drop successful!");
} catch (error) {
  console.error("Drag and drop failed:", error);
}
})
