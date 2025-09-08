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
  await driver.sleep(300);

  // select Start Date
  const startDateInput = await driver.findElement(
    By.xpath("//input[@placeholder='Select Start Date']")
  );
  await startDateInput.click();
  await driver.sleep(300);
  const day19 = await driver.findElement(
    By.xpath("//div[contains(@class,'react-datepicker__day') and text()='19']")
  );
  await day19.click();
  await driver.sleep(300);
  const endDateInput = await driver.findElement(
    By.xpath("//input[@placeholder='Select End Date']")
  );
  await endDateInput.click();
  await driver.sleep(300);
  const day27 = await driver.findElement(
    By.css("div[aria-label='Choose Saturday, September 27th, 2025']")
  );
  await day27.click();
  await driver.sleep(300);

  const dayF = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class,'availability-days-')]//p[normalize-space()='F']"
      )
    ),
    15000
  );
  await driver.wait(until.elementIsVisible(dayF), 5000);
  await dayF.click();
  await driver.sleep(300);

  const yellowPatch = await driver.wait(
    until.elementLocated(By.css("div.patch.color-yellow")),
    5000
  );
  await yellowPatch.click();
  await driver.executeScript("window.scrollBy(0, 500);");

  // click on save button

  const saveBtn = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[contains(@class,'modal-success-button') and normalize-space(text())='Save']"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(saveBtn), 5000);
  await saveBtn.click();
  // click save again
  const saveBtns = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class,'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(saveBtns), 5000);
  await saveBtns.click();
  await driver.sleep(300);
});

Then("Select Pickup", async function () {
  const pickupInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space()='Set up the Experience Pickup Places']/following::input[@id='react-select-4-input']"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(pickupInput), 5000);
  await pickupInput.click();

  const firstOption = await driver.wait(
    until.elementLocated(By.xpath("//div[@role='option'][1]")),
    10000
  );

  await driver.wait(until.elementIsVisible(firstOption), 5000);
  await firstOption.click();
  await driver.actions().move({ x: 10, y: 10 }).click().perform();
  await driver.sleep(300);
});

Then("Select Drop", async function () {
  const dropOffInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space()='Set up the Experience Drop-Off Places']/following::input[@id='react-select-5-input']"
      )
    ),
    10000
  );

  await dropOffInput.sendKeys(Key.ARROW_DOWN);

  const firstDropOption = await driver.wait(
    until.elementLocated(By.xpath("//div[@role='option'][1]")),
    10000
  );
  await firstDropOption.click();
  await driver.actions().move({ x: 10, y: 10 }).click().perform();

  const saveNextBtn = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class,'save-and-next-button') and normalize-space(text())='Save and Next']"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(saveNextBtn), 5000);
  await saveNextBtn.click();

  await driver.sleep(1000);
});

Then("Click on Extra Button", async function () {
  const addExtraBtn = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[contains(@class,'primary-btn') and normalize-space(text())='Add Extra']"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(addExtraBtn), 5000);
  await addExtraBtn.click();
});

Then("Enter Title", async function () {
  const titleInput = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space()='Title']/following::input[1]")
    ),
    10000
  );

  await titleInput.clear();

  await titleInput.sendKeys("My Test Title");
  await driver.sleep(1000);

  // Max units per boxing
  const noMaxRadio = await driver.wait(
    until.elementLocated(By.id("noMax")),
    10000
  );

  await driver.wait(until.elementIsVisible(noMaxRadio), 5000);
  await noMaxRadio.click();

  await driver.sleep(1000);

  // Enter description
  const descriptionBox = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space()='Description']/following::textarea[1]"
      )
    ),
    10000
  );

  await descriptionBox.clear();

  await descriptionBox.sendKeys("This is my test description for automation.");

  // Advance Setting
  const commissionInput = await driver.wait(
    until.elementLocated(By.id("commissionGroup")),
    10000
  );

  await commissionInput.clear();
  await commissionInput.sendKeys("Test Commission Group");
  await driver.sleep(1000);

  // click on save button
  const saveBtn = await driver.wait(
    until.elementLocated(By.css("button.modal-success-button")),
    10000
  );

  await saveBtn.click();
  await driver.sleep(1000);

  // click on save and next button
  const saveNextBtn = await driver.wait(
    until.elementLocated(By.css("button.save-and-next-button")),
    10000
  );

  await driver.executeScript("arguments[0].scrollIntoView(true);", saveNextBtn);
  await saveNextBtn.click();
  await driver.sleep(1000);
});

Then("Add Task", async function () {
  const addTasksBtn = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[contains(@class,'primary-btn') and normalize-space(text())='Add Tasks']"
      )
    ),
    10000
  );

  await driver.executeScript("arguments[0].scrollIntoView(true);", addTasksBtn);
  await addTasksBtn.click();
  await driver.sleep(1000);

  // Enter Title
  const taskTitleInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space()='Task Title']/following-sibling::input"
      )
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    taskTitleInput
  );
  await taskTitleInput.sendKeys("My First Task");
  await driver.sleep(1000);

  // Enter Description
  const descriptionTextarea = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space()='Description']/following-sibling::textarea"
      )
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    descriptionTextarea
  );
  await descriptionTextarea.sendKeys("This is the task description.");
  await driver.sleep(1000);

  // Enter Time
  const startTimeInput = await driver.wait(
    until.elementLocated(By.id("start-time")),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    startTimeInput
  );
  await startTimeInput.sendKeys("1140");
  await driver.sleep(1000);

  // click on save
  const saveBtn = await driver.wait(
    until.elementLocated(By.css("button.modal-success-button")),
    10000
  );

  await driver.executeScript("arguments[0].scrollIntoView(true);", saveBtn);
  await saveBtn.click();
  await driver.sleep(300);

  // click save and next
  const saveNextBtn = await driver.wait(
    until.elementLocated(By.css("button.save-and-next-button")),
    10000
  );

  await driver.executeScript("arguments[0].scrollIntoView(true);", saveNextBtn);
  await saveNextBtn.click();
  await driver.sleep(1000);
});

Then("Important Info", async function () {
  const label = "Pick Languages available on the tour.";

  // Open dropdown
  const dropdownContainer = await driver.wait(
    until.elementLocated(
      By.xpath(
        `//label[normalize-space(text())='${label}']/following::div[contains(@class,'css-13cymwt-control')][1]`
      )
    ),
    10000
  );
  await dropdownContainer.click();
  await driver.sleep(500);

  // Select first option
  const firstOption = await driver.wait(
    until.elementLocated(
      By.xpath(`//div[@role='listbox']//div[@role='option'][1]`)
    ),
    10000
  );
  await firstOption.click();
  await driver.actions().move({ x: 10, y: 10 }).click().perform();
  await driver.sleep(500);

  // select Age Range
  const labels = "Age Range";
  const dropdownInputs = await driver.wait(
    until.elementLocated(
      By.xpath(
        `//label[normalize-space(text())='${labels}']/following::input[contains(@id,'react-select')][1]`
      )
    ),
    10000
  );

  await dropdownInputs.click();

  const firstOptions = await driver.wait(
    until.elementLocated(
      By.xpath(
        `//div[contains(@class,'css-1xc3v61-indicatorContainer')]/following::div[@role='option'][1]`
      )
    ),
    10000
  );

  await firstOptions.click();
  await driver.actions().move({ x: 10, y: 10 }).click().perform();
  await driver.sleep(1000);

  // select what to bring
  const label1 = "What to Bring";
  const dropdownInput1 = await driver.wait(
    until.elementLocated(
      By.xpath(
        `//label[normalize-space(text())='${label1}']/following::input[contains(@id,'react-select')][1]`
      )
    ),
    10000
  );

  await dropdownInput1.click();
  const firstOption1 = await driver.wait(
    until.elementLocated(By.xpath(`//div[@role='option'][1]`)),
    10000
  );

  await firstOption1.click();
  await driver.actions().move({ x: 10, y: 10 }).click().perform();
  await driver.sleep(1000);

  // select cancellation policy
  const label2 = "Cancellation Policy";
  const dropdownInput2 = await driver.wait(
    until.elementLocated(
      By.xpath(
        `//label[normalize-space(text())='${label2}']/following::input[contains(@id,'react-select')][1]`
      )
    ),
    10000
  );

  await dropdownInput2.click();
  const firstOption2 = await driver.wait(
    until.elementLocated(By.xpath(`//div[@role='option'][1]`)),
    10000
  );

  await firstOption2.click();
  await driver.actions().move({ x: 10, y: 10 }).click().perform();
  await driver.sleep(1000);

  // click on save and next
  const saveNextButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[contains(@class,'save-and-next-button')]")
    ),
    10000
  );

  await saveNextButton.click();
  await driver.sleep(1000);
});

Then("Know Before you go", async function () {
  const label = "What should travelers know before they book?";
  const dropdownContainer = await driver.wait(
    until.elementLocated(
      By.xpath(
        `//label[normalize-space(text())='${label}']/following::div[contains(@class,'css-13cymwt-control')][1]`
      )
    ),
    10000
  );
  await dropdownContainer.click();
  await driver.sleep(500);

  const firstOption = await driver.wait(
    until.elementLocated(
      By.xpath(`//div[@role='listbox']//div[@role='option'][1]`)
    ),
    10000
  );

  await firstOption.click();
  await driver.actions().move({ x: 10, y: 10 }).click().perform();
  await driver.sleep(500);

  // Enter info
  const textarea = await driver.wait(
    until.elementLocated(By.id("experienceInfo")),
    10000
  );

  await textarea.sendKeys("This is some important information for travelers.");
  await driver.sleep(500);

  // Physical difficulty level
  const labelq = "Physical difficulty level";

  // 1. Click on the dropdown input to open options
  const dropdownInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        `//label[normalize-space(text())='${labelq}']/following::input[contains(@id,'react-select')][1]`
      )
    ),
    15000
  );
  await dropdownInput.click();
  await driver.sleep(1000);

  // 2. Select the first option
  const firstOptionq = await driver.wait(
    until.elementLocated(
      By.xpath(
        `//div[contains(@class,'css-13cymwt-control')]/following::div[@role='option'][1]`
      )
    ),
    15000
  );
  await firstOptionq.click();
  await driver.actions().move({ x: 10, y: 10 }).click().perform();
  await driver.sleep(1000);

  // select age limit
  const checkbox = await driver.wait(
    until.elementLocated(
      By.css('input.PrivateSwitchBase-input[type="checkbox"]')
    ),
    10000
  );

  await checkbox.click();
  await driver.sleep(500);

  // click save and next
  const saveNextButton = await driver.wait(
    until.elementLocated(By.css("button.save-and-next-button")),
    10000
  );
  await saveNextButton.click();
  await driver.sleep(1000);
});

Then("Route", async function () {
  const routeInfoTextarea = await driver.wait(
    until.elementLocated(
      By.css('textarea[placeholder="Route important information here..."]')
    ),
    10000
  );

  await routeInfoTextarea.sendKeys(
    "Enter your route important information here."
  );
  await driver.sleep(1000);

  // click save and next
  const saveAndNextButton = await driver.wait(
    until.elementLocated(By.css("button.save-and-next-button")),
    10000
  );

  await saveAndNextButton.click();
  await driver.sleep(1000);
});

Then("Pricing", async function () {
  // click on add rate
  const addRateButton = await driver.findElement(
    By.xpath("//button[text()='Add Rate']")
  );
  await addRateButton.click();
  await driver.sleep(1000);
  // Enter code
  const codeInput = await driver.wait(
    until.elementLocated(By.id("code")),
    10000
  );

  await codeInput.sendKeys("BUADMIN454");
  await driver.sleep(1000);

  // Enter Title
  const titleInput = await driver.wait(
    until.elementLocated(By.id("title")),
    10000
  );

  await titleInput.sendKeys("testing");
  await driver.sleep(1000);

  // select prefered  language
  const label = await driver.findElement(
    By.xpath("//label[text()='Languages']")
  );
  const dropdown = await label.findElement(
    By.xpath("following-sibling::div//input")
  );

  await dropdown.click();

  await driver.sleep(500);

  const firstOption = await driver.findElement(
    By.xpath("//div[contains(@class,'css-17') or contains(@class,'option')][1]")
  );
  await firstOption.click();

  // await driver.actions().move({ x: 10, y: 10 }).click().perform();
  await driver.sleep(10000);

  // cancellation policy
  try {
    // Wait until the label is present
    const labelca = await driver.wait(
      until.elementLocated(
        By.xpath("//label[contains(text(),'Cancellation Policy')]")
      ),
      5000
    );

    const dropdownca = await labelca.findElement(
      By.xpath("following-sibling::div//input")
    );
    await dropdownca.click();
    await driver.sleep(500);

    try {
      const firstOptionca = await driver.wait(
        until.elementLocated(
          By.xpath(
            "(//div[contains(@class,'css-17') or contains(@class,'option')])[1]"
          )
        ),
        2000
      );
      await firstOptionca.click();
    } catch (err) {
      console.log(
        "No options available for Cancellation Policy, skipping selection."
      );
    }

    // await driver.actions().move({ x: 10, y: 10 }).click().perform();
    await driver.sleep(1000);
    await driver.executeScript("window.scrollBy(0, 500)");
  } catch (err) {
    console.log("Cancellation Policy dropdown not found, skipping.");
    await driver.executeScript("window.scrollBy(0, 500)");
  }

  // Start Time and Duration .....................
  // await driver.sleep(2000)
  // await driver.executeScript("window.scrollBy(0, 500)");
  // await driver.sleep(2000)
  // const startTimeInput = await driver.wait(
  //   until.elementLocated(By.css("#react-select-5-input")),
  //   10000
  // );

  // await startTimeInput.click();

  // const firstStartTimeOption = await driver.wait(
  //   until.elementLocated(By.xpath("(//div[@role='option'])[1]")),
  //   5000
  // );

  // await firstStartTimeOption.click();

  try {
    // Wait until the label is present
    const labelca = await driver.wait(
      until.elementLocated(
        By.xpath("//label[contains(text(),'Start Time and Duration')]")
      ),
      5000
    );

    const dropdownca = await labelca.findElement(
      By.xpath("following-sibling::div//input")
    );
    await dropdownca.click();
    await driver.sleep(500);

    try {
      const firstOptionca = await driver.wait(
        until.elementLocated(
          By.xpath(
            "(//div[contains(@class,'css-17') or contains(@class,'option')])[1]"
          )
        ),
        2000
      );
      await firstOptionca.click();
    } catch (err) {
      console.log(
        "No options available for Cancellation Policy, skipping selection."
      );
    }

    // await driver.actions().move({ x: 10, y: 10 }).click().perform();
    await driver.sleep(1000);
    await driver.executeScript("window.scrollBy(0, 500)");
  } catch (err) {
    console.log("Cancellation Policy dropdown not found, skipping.");
    await driver.executeScript("window.scrollBy(0, 500)");
  }

  // click on checkbox
  const ageRangeCheckbox = await driver.findElement(
    By.id("age-range-70f81a66-da0f-47fa-b950-a0e30887965f")
  );
  await ageRangeCheckbox.click();

  // click on save button
  const saveButton = await driver.findElement(By.css(".modal-success-button"));
  await saveButton.click();
  await driver.sleep(1000);
  // click save and next

  try {
    const saveNextBtn = await driver.findElement(
      By.xpath("//button[text()='Save and Next']")
    );
    await saveNextBtn.click();
  } catch (err) {
    console.log("Save and Next button not found or not clickable, skipping.");
  }

  await driver.sleep(20000);
});
