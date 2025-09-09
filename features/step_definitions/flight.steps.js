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
  await experienceCodeInput.sendKeys("exp-7891");
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

// Then("Select Categories That Describe Experience", async function () {
//   const labelroomamenities = await driver.wait(
//     until.elementLocated(
//       By.xpath(
//         "//label[normalize-space(text())='Choose the Categories that best describe your Experience']"
//       )
//     ),
//     10000
//   );
//   await driver.sleep(2000);

//   const containeramenities = await labelroomamenities.findElement(
//     By.xpath("ancestor::div[contains(@class, 'mb-3')]")
//   );

//   const selectControlamenities = await containeramenities.findElement(
//     By.css(".css-13cymwt-control")
//   );
//   await driver.executeScript(
//     "arguments[0].scrollIntoView({block: 'center'});",
//     selectControlamenities
//   );
//   await driver.sleep(500);
//   await driver.executeScript("arguments[0].click();", selectControlamenities);

//   const inputamenities = await selectControlamenities.findElement(
//     By.css("input[id^='react-select'][id$='-input']")
//   );

//   await inputamenities.sendKeys(Key.ARROW_DOWN);
//   await driver.sleep(1000);
//   await inputamenities.sendKeys(Key.ENTER);

//   await inputamenities.sendKeys(Key.ARROW_DOWN);
//   await driver.sleep(1000);
//   await inputamenities.sendKeys(Key.ENTER);
//   await driver.sleep(1000);
// });

Then("Select Categories That Describe Experience", async function () {
  // Step 1: Locate the label
  const label = await driver.wait(
    until.elementLocated(
      By.xpath("//label[contains(normalize-space(.), 'Categories')]")
    ),
    10000
  );

  // Step 2: Find the ancestor container
  const container = await label.findElement(
    By.xpath("ancestor::div[contains(@class, 'mb-3')]")
  );

  // Step 3: Find the input inside react-select
  const input = await container.findElement(
    By.css("input[id^='react-select'][id$='-input']")
  );

  // Step 4: Scroll into view and click to focus
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", input);
  await driver.sleep(500);
  await input.click();

  // Step 5: Select the first two options via ARROW_DOWN + ENTER
  await input.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await input.sendKeys(Key.ENTER);
  await input.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await input.sendKeys(Key.ENTER);
  await driver.sleep(1000);
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
  await driver.executeScript("arguments[0].scrollIntoView(true);", firstOption);
  await driver.sleep(1000);
  await firstOption.click();

  // Choose a state:
  // const stateLabel = await driver.findElement(
  //   By.xpath("//label[normalize-space(text())='Choose a States:']")
  // );

  // const stateDropdownId = await stateLabel.getAttribute("for");
  // const stateDropdown = await driver.findElement(By.id(stateDropdownId));

  // const firstStateOption = await stateDropdown.findElement(
  //   By.xpath("./option[2]")
  // );

  // await driver.executeScript("arguments[0].scrollIntoView(true);", firstStateOption);
  // await driver.sleep(500);
  // await firstStateOption.click();
  // Find the wrapper div that contains the label and dropdown

  const stateWrapper = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Choose a States:']/parent::div")
  );
  const stateDropdown = await stateWrapper.findElement(By.tagName("select"));
  const firstStateOption = await stateDropdown.findElement(
    By.xpath("./option[3]")
  );
  await firstStateOption.click();
  await driver.sleep(1000);

  // Choose a City

  const cityWrapper = await driver.findElement(
    By.xpath("//label[normalize-space(text())='Choose a City:']/parent::div")
  );
  const cityDropdown = await cityWrapper.findElement(By.tagName("select"));
  const selectOption = await cityDropdown.findElement(By.xpath("./option[3]"));
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

  // in avaibility time date or pass  there click on save

  const clickOnSave = await driver.findElement(By.css(".save-and-next-button"));
  await driver.executeScript("arguments[0].scrollIntoView(true);", clickOnSave);
  await clickOnSave.click();

  await driver.sleep(1000);
});

Then("Booking Cutoff", async function () {
  // SELECT How close to the experience start time can you take your final booking?
  const cutoffWrapper = await driver.findElement(
    By.xpath(
      "//label[normalize-space(text())='How close to the experience start time can you take your final booking?']/parent::div"
    )
  );

  const cutoffInput = await cutoffWrapper.findElement(
    By.xpath(".//input[contains(@id,'react-select')]")
  );
  await driver.executeScript("arguments[0].scrollIntoView(true);", cutoffInput);
  await cutoffInput.click();
  const secondOption = await driver.wait(
    until.elementLocated(
      By.xpath(
        "(//div[contains(@id,'react-select') and contains(@class,'option')])[2]"
      )
    ),
    5000
  );
  await secondOption.click();

  // Enter Weeks , Days Hours and Minuts
  // Weeks
  const weeksInput = await driver.findElement(By.id("weeks"));
  await weeksInput.clear();
  await weeksInput.sendKeys("2");
  await driver.sleep(2000);

  // Days
  const daysInput = await driver.findElement(By.id("days"));
  await daysInput.clear();
  await daysInput.sendKeys("5");
  await driver.sleep(2000);

  // Hours
  const hoursInput = await driver.findElement(By.id("hours"));
  await hoursInput.clear();
  await hoursInput.sendKeys("12");
  await driver.sleep(2000);

  // Minutes
  const minutesInput = await driver.findElement(By.id("minutes"));
  await minutesInput.clear();
  await minutesInput.sendKeys("30");
  await driver.sleep(2000);

  // Click on Save
  const clickonSaved = await driver.findElement(
    By.xpath("//button[normalize-space(text())='Save']")
  );
  await clickonSaved.click();
  await driver.sleep(1000);
});

Then("Avaibility", async function () {
  //What is your experience's capacity?
  const limitedRadio = await driver.findElement(
    By.xpath("//input[@type='radio' and @value='Limited']")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    limitedRadio
  );
  await limitedRadio.click();
  await driver.sleep(1000);
  const clicksaveBtn = await driver.findElement(
    By.xpath("//button[normalize-space(text())='Save']")
  );
  await clicksaveBtn.click();
  await driver.sleep(1000);
});

Then("Departure Time", async function () {
  const addDepartureBtn = await driver.findElement(
    By.xpath("//button[normalize-space(text())='Add Departure Time']")
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    addDepartureBtn
  );
  await addDepartureBtn.click();
});

Then("Add Time", async function () {
  const addtime = await driver.findElement(By.id("start-time"));
  await addtime.click();

  await addtime.sendKeys(2040);
  await driver.sleep(1000);
  // Duration(Horus)
  const selectDuration = await driver.findElement(By.id("hour"));
  await selectDuration.clear();
  await selectDuration.sendKeys(10);
  await driver.sleep(1000);

  const selectMinutes = await driver.findElement(By.id("minutes"));
  await selectMinutes.clear();
  await selectMinutes.sendKeys(25);

  // click on save button
const modal = await driver.wait(
  until.elementLocated(By.css(".modal-content")),
  5000
);

const saveButton = await modal.findElement(
  By.xpath(".//button[normalize-space(text())='Save']")
);

await driver.executeScript("arguments[0].scrollIntoView(true);", saveButton);
await saveButton.click();
await driver.sleep(1000);

  // again click on save button
  const saveButtons = await driver.findElement(
    By.xpath("//button[normalize-space(text())='Save']")
  );
  await saveButtons.click();

  await driver.sleep(1000);
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
  await driver.sleep(1000);
});

Then("Media and Description", async function(){
  const placeholder = await driver.wait(
        until.elementLocated(
          By.xpath(
            "//div[@class='css-1jqq78o-placeholder' and normalize-space()='Select genres...']"
          )
        ),
        10000
      );
  
      // 2. Go up to the clickable control wrapper
      const dropdownControls = await placeholder.findElement(
        By.xpath("ancestor::div[contains(@class, 'css-13cymwt-control')]")
      );
  
      // 3. Click to open the dropdown
      await dropdownControls.click();
      const firstOption = await driver.wait(
        until.elementLocated(By.css("[id^='react-select'][id$='-option-0']")),
        5000
      );
      await firstOption.click();
  
      const downloadsFolder = path.join(os.homedir(), "Downloads");
      const imagePath = path.join(
        downloadsFolder,
        "istockphoto-1798864003-2048x2048.jpg"
      );
      const fileInput = await driver.findElement(By.id("imageUpload"));
      await fileInput.sendKeys(imagePath);
      await driver.sleep(2000);
  
      // click and add video link
      const inpusst = await driver.findElement(
        By.xpath("//input[@placeholder='Paste the video link here...']")
      );
      await inpusst.sendKeys("https://example.com/video.mp4");
      await driver.sleep(2000);
  
      // click save button
      const buttonSave = await driver.findElement(
        By.xpath("//button[normalize-space(text())='Save and Next']")
      );
      await buttonSave.click();
      await driver.sleep(1000);

})

Then("Pickup and Drop-off",async function(){
  // Set up the flight Pickup Places
const label = await driver.findElement(
  By.xpath("//label[normalize-space(text())='Set up the flight Pickup Places']")
);

const pickupInput = await label.findElement(
  By.xpath("./following::input[contains(@id,'react-select')][2]")
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
