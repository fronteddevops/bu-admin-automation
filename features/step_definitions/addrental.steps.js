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

Given("I am logged for Add Rental", { timeout: 180000 }, async function () {
  await driver.get("http://192.168.29.67:5174/");
  const emailInput = await driver.wait(
    until.elementLocated(By.css("input[name='email'][placeholder='Email']")),
    5000
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
});

Then("Click on Rental", async function () {
  const tourRadio = await driver.findElement(
    By.xpath("//input[@type='radio' and @id='Rental' and @value='Rental']")
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

// Basic Info
Then("Give your Experience a Code", async function () {
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
  await experienceCodeInput.sendKeys("exp-0011");
  await driver.sleep(1000);
});

Then("What is the Type of your Experience", async function () {
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
  await driver.sleep(1000);
});

Then("Choose the Themes that best describe your Experience", async function () {
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
  await driver.sleep(1000);
});

Then(
  "Choose the Categories that best describe your Experience",
  async function () {
    const labeldescexp = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='Choose the Categories that best describe your Experience']"
        )
      )
    );

    const containerdestexp = await labeldescexp.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const selectControldesexp = await containerdestexp.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      selectControldesexp
    );

    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", selectControldesexp);

    const inputdesexp = await selectControldesexp.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await inputdesexp.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(1000);
    await inputdesexp.sendKeys(Key.ENTER);
    await driver.sleep(1000);
  }
);

Then("Select Country , States, City, Post Code etc", async function () {
  // Choose a country:
  const countryLabel = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Choose a country:']")
  );

  const dropdownId = await countryLabel.getAttribute("for");
  const countryDropdown = await driver.findElement(By.id(dropdownId));
  await driver.sleep(2000);
  const firstOption = await countryDropdown.findElement(
    By.xpath("./option[3]")
  );
  await driver.executeScript("arguments[0].scrollIntoView(true);", firstOption);
  await driver.sleep(1000);
  await firstOption.click();

  const stateWrapper = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Choose a States:']/parent::div")
  );
  const stateDropdown = await stateWrapper.findElement(By.tagName("select"));
  await driver.sleep(2000);
  const firstStateOption = await stateDropdown.findElement(
    By.xpath("./option[2]")
  );
  await firstStateOption.click();
  await driver.sleep(1000);

  // Choose a City
  const cityWrapper = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Choose a City:']/parent::div")
  );
  const cityDropdown = await cityWrapper.findElement(By.tagName("select"));
  const selectOption = await cityDropdown.findElement(By.xpath("./option[2]"));
  await selectOption.click();

  // Enter postal Code
  const postalWrapper = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Post Code:']/parent::div")
  );
  const selectInput = await postalWrapper.findElement(
    By.xpath(".//input[@id='experienceCode' and @placeholder='Enter code']")
  );
  await driver.executeScript("arguments[0].scrollIntoView(true);", selectInput);
  await selectInput.clear();
  await selectInput.sendKeys("452010");

  // Click on Save and Next
  const clickOnSaveAndNext = await driver.findElement(
    By.xpath("//button[normalize-space(text())='Save and Next']")
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    clickOnSaveAndNext
  );
  await clickOnSaveAndNext.click();
  await driver.sleep(1000);
});

// Media and Description
Then("Tell your travelers what the experience is all about", async function () {
  const selectControl = await driver.wait(
    until.elementLocated(By.css("div[class*='-control']")),
    20000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    selectControl
  );

  await driver.executeScript("arguments[0].click();", selectControl);
  const input = await driver.wait(
    until.elementLocated(By.css("input[id^='react-select'][id$='-input']")),
    10000
  );

  await input.sendKeys("Adventure");
  await driver.sleep(1000);
  await input.sendKeys(Key.ENTER);
});

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

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    videoInput
  );

  await videoInput.clear();
  await videoInput.sendKeys("https://example.com/my-video-link");
  await driver.sleep(1000);

  // click on save and next
  const buttonsmedia = await driver.findElements(
    By.xpath(
      "//button[contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
    )
  );
  await buttonsmedia[0].click();
  await driver.sleep(1000);
});

Then("in Avaibility Date and time and Click on Save", async function () {
  const saveButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButton
  );

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

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    hoursInput
  );

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

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    minutesInput
  );

  await minutesInput.clear();
  await minutesInput.sendKeys("3");
  await driver.sleep(1000);

  // in booking off click on save button
  const saveButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButton
  );

  await saveButton.click();
  await driver.sleep(1000);

  // click again save button
  const saveButtonAvaibility = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
      )
    ),
    5000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtonAvaibility
  );
  await saveButtonAvaibility.click();
  await driver.sleep(1000);
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
  await driver.sleep(1000)

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
  await driver.sleep(1000);
});

Then("Click on Add retun time duration", async function(){
  const button = await driver.wait(
  until.elementLocated(
    By.xpath("//button[normalize-space(text())='Add Return - Time / Duration']")
  ),
  10000
);
await button.click();
})

Then("Enter Return time", async function(){
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
  
  // click on save

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
  await driver.sleep(1000)

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
  await driver.sleep(10000);
})


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
  await driver.sleep(1000)

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
  await driver.sleep(1000);
});

Then("Pickup and Drop-off",async function(){
  // Set up the flight Pickup Places
const label = await driver.findElement(
  By.xpath("//label[normalize-space(text())='Set up the Experience Pickup Places']")
);

const pickupInput = await label.findElement(
  By.xpath("./following::input[contains(@id,'react-select')][1]")
);

await pickupInput.click();
await driver.wait(
  until.elementsLocated(By.css(".css-yt9ioa-option, .css-1n7v3ny-option")),
  5000
);

const options = await driver.findElements(
  By.css(".css-yt9ioa-option, .css-1n7v3ny-option")
);

if (options.length > 0) {
  await options[2].click();
} else {
  throw new Error("No options found for Pickup Places");
}
await driver.sleep(10000)
// Set up the flight Drop-Off Places
 
})