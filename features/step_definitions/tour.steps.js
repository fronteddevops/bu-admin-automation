const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");
const os = require("os");
const {
  Given,
  When,
  Then,
  After,
  Before,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const assert = require("assert");
const chromedriver = require("chromedriver");
const chrome = require("selenium-webdriver/chrome");

let driver;

setDefaultTimeout(60 * 1000);

// Setup browser before each scenario
Before(async function () {
  let options = new chrome.Options();
  // Remove or comment out the headless argument:
  // options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
  options.addArguments("--no-sandbox", "--disable-dev-shm-usage");
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  await driver.manage().window().maximize();
});

// Teardown after each scenario
After(async function () {
  if (driver) {
    await driver.quit();
  }
});

// Step: Given I am logged in as admin
Given(
  "I am logged in as admin in tour",
  { timeout: 180000 },
  async function () {
    await driver.get("http://192.168.29.67:5173/kanban");

    // Wait for email input to appear
    const emailInput = await driver.wait(
      until.elementLocated(By.css("input[name='email'][placeholder='Email']")),
      15000
    );
    await driver.wait(until.elementIsVisible(emailInput), 10000);
    await emailInput.sendKeys("admin@gmail.com");

    const passwordInput = await driver.wait(
      until.elementLocated(
        By.css("input[name='password'][placeholder='Password']")
      ),
      10000
    );
    await driver.wait(until.elementIsVisible(passwordInput), 10000);
    await passwordInput.sendKeys("admin123");

    const signInBtn = await driver.wait(
      until.elementLocated(By.id("kt_sign_in_submit")),
      10000
    );
    await driver.wait(until.elementIsVisible(signInBtn), 10000);
    await driver.wait(until.elementIsEnabled(signInBtn), 10000);
    await signInBtn.click();
  }
);

// Step: When navigating to Products > Tour > Add Product
When("home page click tour add Product and select Tour", async function () {
  const productsMenu = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class, 'menu-accordian-list') and .//span[text()='Products']]"
      )
    ),
    10000
  );
  await driver.wait(until.elementIsVisible(productsMenu), 5000);
  await productsMenu.click();

  const tourButton = await driver.findElement(
    By.xpath(
      "//button[contains(@class, 'btn') and normalize-space(text())='Tour']"
    )
  );
  await tourButton.click();

  const addProductButton = await driver.findElement(
    By.xpath(
      "//button[contains(@class, 'primary-btn') and normalize-space(text())='Add Products']"
    )
  );
  await addProductButton.click();
});

// Fill Basic Info

Then("Click on Basic Info", async function () {
  const tourRadio = await driver.findElement(
    By.xpath("//input[@type='radio' and @id='Tour' and @value='Tour']")
  );
  await tourRadio.click();
  const yesButton = await driver.findElement(
    By.xpath(
      "//button[contains(@class, 'modal-success-button') and normalize-space(text())='Yes']"
    )
  );
  await yesButton.click();
});

// Add Experience Code

Then("Enter Experice Code", async function () {
  const experienceCodeInput = await driver.findElement(
    By.xpath(
      "//label[contains(text(), 'Give your Experience a Code')]/following::input[1]"
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

Then("Choose Country Choose State and Choose City", async function () {
  const countrySelect = await driver.findElement(
    By.xpath(
      "//label[contains(text(), 'Choose a country:')]/following-sibling::select"
    )
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    countrySelect
  );

  await countrySelect.click();
  const options = await countrySelect.findElements(By.tagName("option"));
  await options[2].click();
  await driver.sleep(1000);

  // choose a state
  const stateContainer = await driver.findElement(
    By.xpath(
      "//div[contains(@class, 'col-md-3')][.//label[contains(text(), 'Choose a State:')]]"
    )
  );

  const stateSelect = await stateContainer.findElement(By.tagName("select"));

  await driver.executeScript(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    stateSelect
  );

  const stateOptions = await stateSelect.findElements(By.tagName("option"));
  await stateOptions[1].click();
  await driver.sleep(1000);

  const cityContainer = await driver.findElement(
    By.xpath(
      "//div[contains(@class, 'col-md-3')][.//label[contains(text(), 'Choose a City:')]]"
    )
  );

  const citySelect = await cityContainer.findElement(By.tagName("select"));

  await driver.executeScript(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    citySelect
  );

  const cityOptions = await citySelect.findElements(By.tagName("option"));

  await cityOptions[2].click();

  const editIconButton = await driver.findElement(
    By.xpath("//button[@type='button' and contains(@class, 'table-icon-edit')]")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    editIconButton
  );

  await editIconButton.click();

  const countryContainer = await driver.findElement(
    By.xpath(
      "//div[contains(@class, 'col-md-3')][.//label[@for='country-1' and contains(text(), 'Choose a country:')]]"
    )
  );

  const countrySelect2 = await countryContainer.findElement(
    By.tagName("select")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    countrySelect2
  );

  const countryOptions = await countrySelect2.findElements(
    By.tagName("option")
  );

  await countryOptions[2].click();
});

// Type of Experience
Then("Select Experience Type", async function () {
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

// Select Theme Describe Experience
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
});

// Select Category Describe Experience
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
  await driver.sleep(1000);
});

// click on save and next button
When("Click on Save And Next Button", async function () {
  const buttons = await driver.findElements(
    By.xpath(
      "//button[contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
    )
  );
  await buttons[0].click();
});

// Media and Description

When("Select Traveller Experience", async function () {
  const h6Heading = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//h6[normalize-space(.)='Tell your travelers what the experience is all about']"
      )
    ),
    10000
  );

  // Scroll to the heading for visibility
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    h6Heading
  );

  // From the heading, move up to its parent and then to the sibling <div> that contains the dropdown
  const selectControlTraveler = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//h6[normalize-space(.)='Tell your travelers what the experience is all about']/following::div[contains(@class, 'css-13cymwt-control')]"
      )
    ),
    5000
  );

  // Click the React Select control to open options
  await driver.executeScript("arguments[0].click();", selectControlTraveler);

  // Find the input inside it
  const inputTraveler = await selectControlTraveler.findElement(
    By.css("input[id^='react-select'][type='text']")
  );

  // Select first option
  await inputTraveler.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(500);
  await inputTraveler.sendKeys(Key.ENTER);

  // Select second option
  await inputTraveler.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(500);
  await inputTraveler.sendKeys(Key.ENTER);
});

// Select image of experience

When("Select Image of Experience", async function () {
  const downloadsFolderDrag = path.join(os.homedir(), "Downloads");
  const imagePaths = path.join(
    downloadsFolderDrag,
    "istockphoto-1798864003-2048x2048.jpg"
  );
  const containerfile = await driver.findElement(
    By.xpath(
      "//label[contains(text(),'Choose your images here or click to add.')]/ancestor::div[contains(@class, 'border')]"
    )
  );

  // Now locate the input[type='file'] inside this container
  const fileInputfile = await containerfile.findElement(
    By.css("input[type='file']")
  );
  await fileInputfile.sendKeys(imagePaths);
  await driver.sleep(1000);
});

When("Enter Video Link", async function () {
  const videoInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//input[@type='text' and @placeholder='Paste the video link here...']"
      )
    ),
    5000
  );

  // Scroll into view (optional)
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    videoInput
  );

  // Clear and input your text
  await videoInput.clear();
  await videoInput.sendKeys("https://example.com/my-video-link");
});

When("Click on Save and Next Button", async function () {
  const buttonsmedia = await driver.findElements(
    By.xpath(
      "//button[contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
    )
  );
  await buttonsmedia[0].click();

  // click on save button
});

//  Avaibility
// Click on time and date

Then("in Avaibility Date and time and Click on Save", async function () {
  const saveButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    5000
  );

  // Scroll into view to make sure it's clickable
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButton
  );

  // Click the button
  await saveButton.click();
  await driver.sleep(2000);
});

When("in Booking Cutoff Enter Week,Days,Hour and Minute", async function () {
  const weeksInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Weeks']/following-sibling::input[@type='number']"
      )
    ),
    5000
  );

  // Scroll into view
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    weeksInput
  );

  // Clear existing value and enter 5
  await weeksInput.clear();
  await weeksInput.sendKeys("5");

  // Enter Days
  const daysInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Days']/following-sibling::input[@type='number']"
      )
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    daysInput
  );

  await daysInput.clear();
  await daysInput.sendKeys("5");

  //Enter Hour
  const hoursInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Hours']/following-sibling::input[@type='number']"
      )
    ),
    5000
  );

  // Scroll to the input (optional but safer)
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    hoursInput
  );

  // Clear existing value and type 10
  await hoursInput.clear();
  await hoursInput.sendKeys("10");

  // Enter Minutes

  const minutesInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Minutes']/following-sibling::input[@type='number']"
      )
    ),
    5000
  );

  // Scroll into view (optional but recommended)
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    minutesInput
  );

  // Clear any existing value and enter 3
  await minutesInput.clear();
  await minutesInput.sendKeys("3");
});

When("Click on Relative to Start Time and Click on Save", async function () {
  const relativeStartRadio = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//h6[normalize-space(text())='Relative to start time']/ancestor::label//input[@type='radio']"
      )
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    relativeStartRadio
  );

  await relativeStartRadio.click();
  const savedButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(savedButton), 5000);
  await driver.wait(until.elementIsEnabled(savedButton), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    savedButton
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", savedButton);
});

When("In Capacity Click on Save", async function () {
  const savedsButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    10000
  );
  await driver.wait(until.elementIsVisible(savedsButton), 5000);
  await driver.wait(until.elementIsEnabled(savedsButton), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    savedsButton
  );
  await driver.sleep(300);

  await driver.executeScript("arguments[0].click();", savedsButton);
});
When("Start Time Click on Add Start-Time -Duration", async function () {
  const addTimeButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[contains(text(),'Add Start - Time / Duration')]")
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    addTimeButton
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", addTimeButton);
});
When("Enter Time, Hours , Minutes and click Save Button", async function () {
  const startTimeInput = await driver.wait(
    until.elementLocated(By.id("start-time")),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    startTimeInput
  );
  await driver.sleep(300);

  await startTimeInput.clear();
  await startTimeInput.sendKeys("04:25");

  // click on duration
  const durationLabel = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Duration (Hours)']")
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    durationLabel
  );
  await driver.sleep(300);

  const durationInput = await driver.wait(
    until.elementLocated(By.id("hour")),
    5000
  );

  await durationInput.clear();
  await durationInput.sendKeys("5");

  // click and add minutes

  const minutesLabel = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Minutes']")
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    minutesLabel
  );
  await driver.sleep(300);

  const minutessInput = await driver.wait(
    until.elementLocated(By.id("minutes")),
    5000
  );

  await minutessInput.clear();
  await minutessInput.sendKeys("25");

  const clicksaveButton = await driver.wait(
    until.elementLocated(By.css("button.modal-success-button")),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    clicksaveButton
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", clicksaveButton);

  const saveButtonclick = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtonclick
  );
  await driver.sleep(300);

  await driver.executeScript("arguments[0].click();", saveButtonclick);
});
// When("Click on Save Button", async function () {
//   const saveButtonclick = await driver.wait(
//     until.elementLocated(
//       By.xpath(
//         "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
//       )
//     ),
//     5000
//   );

//   await driver.executeScript(
//     "arguments[0].scrollIntoView({block: 'center'});",
//     saveButtonclick
//   );
//   await driver.sleep(300);

//   await driver.executeScript("arguments[0].click();", saveButtonclick);
// });

When("Calender , Add Avaibility , Veiw Avaibility and Save", async function () {
  const addAvailabilityButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[normalize-space(text())='Add Availability']")
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    addAvailabilityButton
  );
  await driver.sleep(300);

  await driver.executeScript("arguments[0].click();", addAvailabilityButton);

  // Click on the dropdown input (select rule level)
  const labelavaibility = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Select the Type of Availability Rule']"
      )
    ),
    10000
  );

  const containeravaibility = await labelavaibility.findElement(
    By.xpath(
      "./following-sibling::div[contains(@class, 'css-b62m3t-container')]"
    )
  );

  const selectControlavaibility = await containeravaibility.findElement(
    By.css(".css-13cymwt-control")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    selectControlavaibility
  );
  await driver.sleep(200);
  await selectControlavaibility.click();

  const inputavaibility = await containeravaibility.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  // await inputavaibility.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(2000);
  // await inputavaibility.sendKeys(Key.ARROW_DOWN);
  // await driver.sleep(2000);
  // await inputavaibility.sendKeys(Key.ARROW_DOWN);
  // await driver.sleep(2000);
  await inputavaibility.sendKeys(Key.ENTER);

  // Step 1: Select Start Date input by placeholder
  const startDateInput = await driver.wait(
    until.elementLocated(By.xpath("//input[@placeholder='Select Start Date']")),
    5000
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    startDateInput
  );
  await driver.sleep(300);
  await startDateInput.clear();
  await startDateInput.sendKeys("07/10/2025");

  const endDateInput = await driver.wait(
    until.elementLocated(By.xpath("//input[@placeholder='Select End Date']")),
    5000
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    endDateInput
  );
  await driver.sleep(300);
  await endDateInput.clear();
  await endDateInput.sendKeys("07/26/2025");

  // click on week day
  const wDayButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class, 'availability-days-selected')]//p[normalize-space(text())='W']"
      )
    ),
    5000
  );

  const buttonText = await wDayButton.getText();

  // await driver.executeScript(
  //   "arguments[0].scrollIntoView({block: 'center'});",
  //   wDayButton
  // );
  await driver.sleep(300);
  await wDayButton.click();

  const greenPatchButton = await driver.wait(
    until.elementLocated(By.css("div.patch.color-green")),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    greenPatchButton
  );
  await driver.sleep(300);
  await greenPatchButton.click();

  // click on save button
  const saveButtonclk = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[contains(@class, 'modal-success-button') and normalize-space(text())='Save']"
      )
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtonclk
  );
  await driver.sleep(300);
  await saveButtonclk.click();

  // click on save button
  const saveButtoncl = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtoncl
  );
  await driver.sleep(300);

  await saveButtoncl.click();
});

When(
  "Pick And Drop - Select experience pickup places and Dropoff places",
  async function () {
    const labelExpPickup = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='Set up the Experience Pickup Places']"
        )
      ),
      10000
    );

    const outerContainer = await labelExpPickup.findElement(
      By.xpath("./ancestor::div[3]")
    );

    const containerExpPickup = await outerContainer.findElement(
      By.css(".css-b62m3t-container")
    );

    const selectControlExpPickup = await containerExpPickup.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      selectControlExpPickup
    );
    await driver.sleep(200);

    await selectControlExpPickup.click();

    const inputExpPickup = await containerExpPickup.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await driver.sleep(1000);
    await inputExpPickup.sendKeys(Key.ENTER);

    const labelDropOff = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='Set up the Experience Drop-Off Places']"
        )
      ),
      10000
    );

    const parentDiv = await labelDropOff.findElement(
      By.xpath("./following-sibling::div[contains(@class, 'form-group')]")
    );

    const dropdownContainer = await parentDiv.findElement(
      By.css(".css-b62m3t-container")
    );

    const control = await dropdownContainer.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      control
    );
    await driver.sleep(300);

    await driver.executeScript("arguments[0].click();", control);

    const input = await dropdownContainer.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await driver.sleep(1000);
    await input.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(200);
    await input.sendKeys(Key.ENTER);
    await driver.sleep(1000);

    // click on save and next button
    const saveAndNextButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
        )
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(saveAndNextButton), 5000);
    await driver.wait(until.elementIsEnabled(saveAndNextButton), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveAndNextButton
    );
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", saveAndNextButton);

    // again click save and next
    await driver.sleep(1000);
    const saveAndNextButtonNext = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
        )
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(saveAndNextButtonNext), 5000);
    await driver.wait(until.elementIsEnabled(saveAndNextButtonNext), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveAndNextButtonNext
    );
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", saveAndNextButtonNext);
  }
);

When(
  "Incluson and Exclusion - Select include Experience and not include Experience",
  async function () {
    await driver.sleep(1000);
    const labelexpincexv = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='What is Include in your Expirience ?']"
        )
      ),
      10000
    );

    const parentDivincexc = await labelexpincexv.findElement(
      By.xpath("./following-sibling::div[1]")
    );

    const dropdownContainerincexp = await parentDivincexc.findElement(
      By.css(".css-b62m3t-container")
    );

    const controlincexc = await dropdownContainerincexp.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      controlincexc
    );
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", controlincexc);
    await driver.sleep(1000);

    const inputincexc = await dropdownContainerincexp.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await driver.sleep(1000);
    await inputincexc.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(200);
    await inputincexc.sendKeys(Key.ENTER);

    await driver.sleep(1000);

    const labelexpincexv1 = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='What is NOT Include in your Expirience ?']"
        )
      ),
      10000
    );

    const parentDivincexc1 = await labelexpincexv1.findElement(
      By.xpath("./following-sibling::div[1]")
    );

    const dropdownContainerincexp1 = await parentDivincexc1.findElement(
      By.css(".css-b62m3t-container")
    );

    const controlincexc1 = await dropdownContainerincexp1.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      controlincexc1
    );
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", controlincexc1);
    await driver.sleep(1000);

    const inputincexc1 = await dropdownContainerincexp1.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await driver.sleep(1000);
    await inputincexc1.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(200);
    await inputincexc1.sendKeys(Key.ENTER);

    // save and next button
    const saveAndNextButtonexp = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
        )
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(saveAndNextButtonexp), 5000);
    await driver.wait(until.elementIsEnabled(saveAndNextButtonexp), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveAndNextButtonexp
    );

    await driver.sleep(300);

    await driver.executeScript("arguments[0].click();", saveAndNextButtonexp);
  }
);

When(
  "Important Info- Select luggage available tour, Age Range , What to Bring , Cancelaltion Policy",
  async function () {
    const lablelang = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='Pick Languages available on the tour.']"
        )
      ),
      10000
    );

    const parentDivinlang = await lablelang.findElement(
      By.xpath("./following-sibling::div[1]")
    );

    const dropdownContainerlang = await parentDivinlang.findElement(
      By.css(".css-b62m3t-container")
    );

    const controlincelang = await dropdownContainerlang.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      controlincelang
    );
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", controlincelang);
    await driver.sleep(1000);

    const inputlang = await dropdownContainerlang.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await driver.sleep(1000);
    await inputlang.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(200);
    await inputlang.sendKeys(Key.ENTER);

    await driver.sleep(1000);

    // click on Age Range
    const lableage = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Age Range']")
      ),
      10000
    );

    const parentDivinage = await lableage.findElement(
      By.xpath("./following-sibling::div[1]")
    );

    const dropdownContainerage = await parentDivinage.findElement(
      By.css(".css-b62m3t-container")
    );

    const controlage = await dropdownContainerage.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      controlage
    );
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", controlage);
    await driver.sleep(1000);

    const inputage = await dropdownContainerage.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await driver.sleep(1000);
    await inputage.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(200);
    await inputage.sendKeys(Key.ENTER);

    // click on Want to Bring
    const lablebring = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='What to Bring']")
      ),
      10000
    );

    const parentDivinbring = await lablebring.findElement(
      By.xpath("./following-sibling::div[1]")
    );

    const dropdownContainbring = await parentDivinbring.findElement(
      By.css(".css-b62m3t-container")
    );

    const controlbring = await dropdownContainbring.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      controlbring
    );
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", controlbring);
    await driver.sleep(1000);

    const inputbring = await dropdownContainbring.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await driver.sleep(1000);
    await inputbring.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(200);
    await inputbring.sendKeys(Key.ENTER);

    // Cancellation Policy
    const lablepolicy = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Cancellation Policy']")
      ),
      10000
    );

    const formGroupDiv = await lablepolicy.findElement(
      By.xpath("./following-sibling::div[contains(@class, 'form-group')]")
    );

    const dropdownContainpolicy = await formGroupDiv.findElement(
      By.css(".css-b62m3t-container")
    );

    const controlpolicy = await dropdownContainpolicy.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      controlpolicy
    );
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", controlpolicy);
    await driver.sleep(1000);

    const inputpolicy1 = await dropdownContainpolicy.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await inputpolicy1.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(200);
    await inputpolicy1.sendKeys(Key.ENTER);

    const inputpolicy2 = await dropdownContainpolicy.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await inputpolicy2.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(300);

    // click on save and next button
    const button = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
        )
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(button), 5000);
    await driver.wait(until.elementIsEnabled(button), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      button
    );
    await driver.sleep(300);

    await driver.executeScript("arguments[0].click();", button);
  }
);

When("Know Before You Go - What should Traveller, Physicall Difficulty,Age Limit", async function(){
  const labelPolicy = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='What should travelers know before they book?']"
      )
    ),
    10000
  );

  // Scroll the label into view (optional)
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    labelPolicy
  );
  await driver.sleep(300);

  // Now directly locate the dropdown container globally (not relative to label)
  const dropdownContainerPolicy = await driver.wait(
    until.elementLocated(By.css(".css-b62m3t-container")),
    5000
  );

  // Then locate the control within it
  const controlPolicy = await dropdownContainerPolicy.findElement(
    By.css(".css-13cymwt-control")
  );

  // Scroll and click
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    controlPolicy
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", controlPolicy);
  await driver.sleep(1000);

  // Locate the input and select via keyboard
  const inputPolicy = await dropdownContainerPolicy.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  await driver.sleep(500);
  await inputPolicy.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(300);
  await inputPolicy.sendKeys(Key.ENTER);

  // Lis important information
  const experienceInfoTextarea = await driver.wait(
    until.elementLocated(By.id("experienceInfo")),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    experienceInfoTextarea
  );
  await driver.sleep(300);

  await experienceInfoTextarea.clear();
  await experienceInfoTextarea.sendKeys(
    "Here is some important experience information."
  );

  // physical difficulty label
  const labelPhysical = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Physical difficulty level']")
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    labelPhysical
  );
  await driver.sleep(300);

  const dropdownContainerPhysical = await driver.wait(
    until.elementLocated(By.css(".css-b62m3t-container")),
    5000
  );

  const controlPhysical = await dropdownContainerPhysical.findElement(
    By.css(".css-13cymwt-control")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    controlPhysical
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", controlPhysical);
  await driver.sleep(1000);

  const inputPhysical = await dropdownContainerPhysical.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  await driver.sleep(500);
  await inputPhysical.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(300);
  await inputPhysical.sendKeys(Key.ENTER);
  await driver.sleep(1000);

  // click on Age Limit Radio Box
  const checkbox = await driver.wait(
    until.elementLocated(By.css("input[type='checkbox'].MuiSwitch-input")),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    checkbox
  );
  await driver.sleep(300);

  await driver.executeScript("arguments[0].click();", checkbox);

  // Input Age
  const ageInput = await driver.wait(
    until.elementLocated(By.css("input[type='number'][placeholder='Age']")),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    ageInput
  );
  await driver.sleep(300);

  await ageInput.clear();
  await ageInput.sendKeys("40");

  // click to Save and Next Button
  const saveAndNextButtonknow = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(saveAndNextButtonknow), 5000);
  await driver.wait(until.elementIsEnabled(saveAndNextButtonknow), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveAndNextButtonknow
  );
  await driver.sleep(300);

  await driver.executeScript("arguments[0].click();", saveAndNextButtonknow);

})
When("Route - Description", async function(){
  const textareaRouteInfo = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//textarea[@placeholder='Route important information here...']"
      )
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    textareaRouteInfo
  );

  await driver.sleep(300);

  await textareaRouteInfo.clear();
  await textareaRouteInfo.sendKeys(
    "This is the route information for the experience."
  );

  // click to save and next button
  const saveAndNextButtondesc = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
      )
    ),
    10000
  );

  await driver.wait(until.elementIsVisible(saveAndNextButtondesc), 5000);
  await driver.wait(until.elementIsEnabled(saveAndNextButtondesc), 5000);

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveAndNextButtondesc
  );
  await driver.sleep(300);

  await driver.executeScript("arguments[0].click();", saveAndNextButtondesc);
})

When("Pricing - Enter Code, Title, Languages, Cancellation Policy, Start Time and Duration", async function(){
  const addRateButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[contains(@class, 'primary-btn') and normalize-space(text())='Add Rate']"
      )
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    addRateButton
  );
  await driver.sleep(300);
  await addRateButton.click();

  // Enter Code
  const codeInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Code']/following-sibling::input[@placeholder='enter code']"
      )
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    codeInput
  );
  await driver.sleep(300);
  await codeInput.clear();
  await codeInput.sendKeys("exm-545");

  // Enter Title
  const titleInput = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Title']/following-sibling::input[@placeholder='enter title']"
      )
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    titleInput
  );
  await driver.sleep(300);
  await titleInput.clear();
  await titleInput.sendKeys("Amazing Sunset Tour");
  await driver.sleep(1000);

  // click on Select Language
  const labellang = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Languages']")
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    labellang
  );
  await driver.sleep(300);

  const dropdownContainerlangs = await driver.wait(
    until.elementLocated(By.css(".css-b62m3t-container")),
    5000
  );

  const controllang = await dropdownContainerlangs.findElement(
    By.css(".css-13cymwt-control")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    controllang
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", controllang);
  await driver.sleep(1000);

  const inputlangs = await dropdownContainerlangs.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  await driver.sleep(500);
  await inputlangs.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(300);
  await inputlangs.sendKeys(Key.ENTER);
  await driver.sleep(1000);

  // select Cancellation Policy
  const labelCancellation = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Cancellation Policy']")
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    labelCancellation
  );
  await driver.sleep(300);

  const containerDiv = await labelCancellation.findElement(
    By.xpath("./ancestor::div[contains(@class, 'w-100')]")
  );

  const dropdownContainerCancellation = await containerDiv.findElement(
    By.css(".css-b62m3t-container")
  );

  const controlCancellation = await dropdownContainerCancellation.findElement(
    By.css(".css-13cymwt-control")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    controlCancellation
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", controlCancellation);
  await driver.sleep(1000);

  const inputCancellation = await dropdownContainerCancellation.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  await inputCancellation.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(300);
  await inputCancellation.sendKeys(Key.ENTER);
  await driver.sleep(1000);

  // Start Time and Duration
  const labeltime = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Start Time and Duration']")
    ),
    10000
  );

  // Scroll to the label
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    labeltime
  );
  await driver.sleep(300);

  const wrapperDiv = await labeltime.findElement(
    By.xpath(
      "./following-sibling::div[contains(@class, 'css-b62m3t-container')]"
    )
  );

  const controltime = await wrapperDiv.findElement(
    By.css(".css-13cymwt-control")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    controltime
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", controltime);
  await driver.sleep(1000);

  const inputtime = await wrapperDiv.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  await driver.sleep(500);
  await inputtime.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(300);
  await inputtime.sendKeys(Key.ENTER);
  await driver.sleep(1000);

  // Click on Age Range
 // Locate all checkboxes inside the Age ranges section
const checkboxes = await driver.wait(
until.elementsLocated(By.css("div.mb-0.w-100 input[type='checkbox']")),
10000
);

// Scroll into view and click the first checkbox
await driver.executeScript(
"arguments[0].scrollIntoView({block: 'center'});",
checkboxes[0]
);
await driver.sleep(300);
await checkboxes[0].click();

  

  // click on save button
  const saveButtons = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[contains(@class, 'modal-success-button') and normalize-space(text())='Save']"
      )
    ),
    10000
  );

  // Scroll and click
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtons
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", saveButtons);
  await driver.sleep(1000)

  // click save and next button 
  const saveAndNextButtonpricing = await driver.wait(
    until.elementLocated(
      By.xpath("//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']")
    ),
    10000
  );
  
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveAndNextButtonpricing
  );
  await driver.sleep(300);
  
  await saveAndNextButtonpricing.click();
  await driver.sleep(1000)
})

When("Extra - Max Unit, Description, Advance Setting And Save", async function(){
  const addExtraButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[normalize-space(text())='Add Extra']")
    ),
    10000
  );
  
  // Scroll into view
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    addExtraButton
  );
  await driver.sleep(300);
  
  // Click the button
  await addExtraButton.click();
  

  // Enter Title 
  const titleInputextra = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Title']/following-sibling::input")
    ),
    10000
  );
  
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    titleInputextra
  );
  await driver.sleep(300);
  
  // Enter title
  await titleInputextra.sendKeys("Title for Testing");

  // click on Max units per Boxing

  const firstRadio = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Max units per boxing']/following-sibling::div//input[@type='radio'][1]")
    ),
    10000
  );
  
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", firstRadio);
  await driver.sleep(300);
  await firstRadio.click();

  // Enter Descriptio

  const descriptionTextarea = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Description']/following-sibling::textarea")
    ),
    10000
  );
  
  // Scroll into view
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    descriptionTextarea
  );
  await driver.sleep(300);
  
  // Enter your description
  await descriptionTextarea.sendKeys("This is the description text.");
  await driver.sleep(500)

  // Enter Commission Input
  const commissionInput = await driver.wait(
    until.elementLocated(By.id("commissionGroup")),
    10000
  );
  
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    commissionInput
  );
  await driver.sleep(300);
  
  await commissionInput.clear();
  
  await commissionInput.sendKeys("Your Commission Group Name");
  await driver.sleep(500)

  // click on save button 
  const saveButtonextra = await driver.wait(
    until.elementLocated(
      By.xpath("//button[normalize-space(text())='Save']")
    ),
    10000
  );
  
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtonextra
  );
  await driver.sleep(300);
  
  await saveButtonextra.click();
  await driver.sleep(1000)

  // Click on Save and Next 

  const saveNextButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']")
    ),
    10000
  );
  
  // Scroll into view if needed
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveNextButton
  );
  await driver.sleep(300);
  
  // Click the button
  await saveNextButton.click();
  await driver.sleep(1000)
})

When("Tasks & Resources - Add Title, Description, Time", async function(){
  const addTasksButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[@type='button' and contains(@class, 'primary-btn') and normalize-space(text())='Add Tasks']")
    ),
    10000
  );
  
  // Scroll into view if needed
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    addTasksButton
  );
  await driver.sleep(300);
  
  // Click the button
  await addTasksButton.click();
  await driver.sleep(1000)

  // Enter Task name 

  const taskInput = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Task Title']/following-sibling::input")
    ),
    10000
  );
  
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    taskInput
  );
  await driver.sleep(300);
  
  await taskInput.clear();
  await taskInput.sendKeys("My Sample Task Name");
  await driver.sleep(1000)

  // Ener Desc

  const descriptionTextareatask = await driver.wait(
    until.elementLocated(By.id("description")),
    10000
  );
  
  // Scroll into view
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    descriptionTextareatask
  );
  await driver.sleep(300);
  
  // Clear and enter description
  await descriptionTextareatask.clear();
  await descriptionTextareatask.sendKeys("This is a sample task description.");
  await driver.sleep(1000)

  // Enter Time 

  const startTimeInputTask = await driver.wait(
    until.elementLocated(By.id("start-time")),
    10000
  );
  
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    startTimeInputTask
  );
  await driver.sleep(300);
  
  await startTimeInputTask.clear();
  await startTimeInputTask.sendKeys("04:25");
  await driver.sleep(1000)

  // Click on Save Button 

  const saveButtonTask = await driver.wait(
    until.elementLocated(
      By.xpath("//button[contains(@class, 'modal-success-button') and normalize-space(text())='Save']")
    ),
    10000
  );
  
  // Scroll into view
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtonTask
  );
  await driver.sleep(300);
  
  // Click the button
  await saveButtonTask.click();
  await driver.sleep(1000)

  

  // Select Resources 

  const labelResources = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Resources']")
    ),
    10000
  );
  
  // Locate the dropdown container using the label's parent context
  const dropdownContainerres = await labelResources.findElement(
    By.xpath("./following-sibling::div//div[contains(@class, 'css-b62m3t-container')]")
  );
  
  const controlres = await dropdownContainerres.findElement(
    By.css(".css-13cymwt-control")
  );
  
  // Scroll into view and click to open dropdown
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    controlres
  );
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", controlres);
  await driver.sleep(1000);
  
  // Find the input element inside the React Select component
  const inputres = await dropdownContainerres.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );
  
  // Send keys to select the first option
  await inputres.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(300);
  await inputres.sendKeys(Key.ENTER);
  await driver.sleep(2000);


  // Click on Save & Next 

  const saveAndNextButtonTask = await driver.wait(
    until.elementLocated(
      By.xpath("//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']")
    ),
    10000
  );
  
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveAndNextButtonTask
  );
  await driver.sleep(300);
  
  await saveAndNextButtonTask.click();
  await driver.sleep(1000)
  const saveAndNextButtonfaq = await driver.wait(
    until.elementLocated(
      By.xpath("//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']")
    ),
    10000
  );
  
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveAndNextButtonfaq
  );
  await driver.sleep(300);
  
  await saveAndNextButtonfaq.click();
})



// Step: Then the Tour should be created successfully
Then("the Tour should be created successfully", async function () {
  const successMsg = await driver.wait(
    until.elementLocated(
      By.xpath("//*[contains(text(),'Tour created successfully')]")
    ),
    10000
  );
  const isDisplayed = await successMsg.isDisplayed();
  assert.strictEqual(isDisplayed, true, "Success message not displayed");
});
