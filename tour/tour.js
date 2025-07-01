const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");
const os = require("os");

(async function AddTour() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.manage().window().maximize();
    await driver.get("http://192.168.29.67:5173/kanban");

    const emailInput = await driver.wait(
      until.elementLocated(By.css("input[name='email'][placeholder='Email']")),
      1000
    );

    await driver.wait(until.elementIsVisible(emailInput), 1000);
    await emailInput.click();
    await emailInput.sendKeys("admin@gmail.com");
    await driver.sleep(1000);
    const passwordInput = await driver.wait(
      until.elementLocated(
        By.css("input[name='password'][placeholder='Password']")
      ),
      1000
    );

    await driver.wait(until.elementIsVisible(passwordInput), 1000);
    await passwordInput.click();
    await passwordInput.sendKeys("admin123");
    await driver.sleep(1000);

    const signInBtn = await driver.wait(
      until.elementLocated(By.id("kt_sign_in_submit")),
      1000
    );

    await driver.wait(until.elementIsVisible(signInBtn), 5000);
    await driver.wait(until.elementIsEnabled(signInBtn), 5000);
    await signInBtn.click();
    await driver.sleep(1000);

    const productsMenu = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[contains(@class, 'menu-accordian-list') and .//span[text()='Products']]"
        )
      ),
      1000
    );

    await driver.wait(until.elementIsVisible(productsMenu), 5000);
    await productsMenu.click();
    await driver.sleep(2000);

    // click on tour
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

    // experience code
    const experienceCodeInput = await driver.findElement(
      By.xpath(
        "//label[contains(text(), 'Give your Experience a Code')]/following::input[1]"
      )
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
      experienceCodeInput
    );

    // Clear and enter the code
    await experienceCodeInput.clear();
    await experienceCodeInput.sendKeys("exp-789");
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
      By.xpath(
        "//button[@type='button' and contains(@class, 'table-icon-edit')]"
      )
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

    // select state

    // const stateContainer1 = await driver.findElement(
    //   By.xpath(
    //     "//div[contains(@class, 'col-md-3')][.//label[@for='state-1' and contains(text(), 'Choose a State:')]]"
    //   )
    // );

    // const stateSelect1 = await stateContainer1.findElement(
    //   By.tagName("select")
    // );

    // await driver.executeScript(
    //   "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    //   stateSelect1
    // );

    // const stateOptions1 = await stateSelect1.findElements(By.tagName("option"));

    // await stateOptions1[2].click();

    // choose a city

    // // const cityContainer1 = await driver.findElement(
    // //   By.xpath("//div[contains(@class, 'col-md-3')][.//label[@for='city-1' and contains(text(), 'Choose a City:')]]")
    // // );

    // // const citySelect1 = await cityContainer1.findElement(By.tagName("select"));

    // // await driver.executeScript(
    // //   "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    // //   citySelect1
    // // );

    // // const cityOptions1 = await citySelect1.findElements(By.tagName("option"));

    // // if (cityOptions1.length > 1) {
    // //   await cityOptions1[1].click();
    // // } else {
    // //   console.error("City option not found");
    // }

    // Select experience type (React Select component)

    // const experienceTypeContainer = await driver.findElement(
    //   By.xpath("//div[contains(@class, 'mb-3')][.//label[contains(text(), 'What is the Type of your Experience')]]")
    // );

    // const reactSelectInput = await experienceTypeContainer.findElement(
    //   By.css("input[id^='react-select'][type='text']")
    // );

    // await driver.executeScript(
    //   "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    //   reactSelectInput
    // );

    // await reactSelectInput.click();
    // await driver.sleep(500);

    // let options1 = await driver.findElements(By.css(".css-10wo9uf-option"));
    // if (options1.length > 0) {
    //   await options1[0].click();
    // }

    // await reactSelectInput.click();
    // await driver.sleep(500);

    // let options2 = await driver.findElements(By.css(".css-10wo9uf-option"));
    // if (options2.length > 0) {
    //   await options2[0].click();
    // }

    // type exp

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

    // experience

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

    // best exp
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

    // eneter to click on save and next

    const buttons = await driver.findElements(
      By.xpath(
        "//button[contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
      )
    );
    await buttons[0].click();

    // click on Tell your travelers what the experience is all about

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

    // add image

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

    // SAVE AND NEXT
    const buttonsmedia = await driver.findElements(
      By.xpath(
        "//button[contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
      )
    );
    await buttonsmedia[0].click();

    // click on save button
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

    // Enter Weeks

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

    // Click on Relative to start Time
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

    // click on save button

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

    // click again Save button

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

    // click on add start time / duration

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

    // Add time
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

    // add avaibility

    // const label = await driver.wait(
    //   until.elementLocated(By.xpath("//label[normalize-space(text())='Select the Type of Availability Rule']")),
    //   5000
    // );

    // const dropdownInput = await driver.wait(
    //   until.elementLocated(By.xpath("//label[normalize-space(text())='Select the Type of Availability Rule']/following::input[@role='combobox']")),
    //   5000
    // );

    // click on add avaibility button
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
      until.elementLocated(
        By.xpath("//input[@placeholder='Select Start Date']")
      ),
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
    console.log("Button text is:", buttonText);

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

    // click on exp pickup place
    // Locate the label by its exact visible text
    // Step 1: Locate the label by visible text
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

    // click and select experience
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

    // Important Info  = Pick Languages Available Tour
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

    // Go to its following sibling div with class 'form-group'
    const formGroupDiv = await lablepolicy.findElement(
      By.xpath("./following-sibling::div[contains(@class, 'form-group')]")
    );

    // Inside that, find the dropdown container
    const dropdownContainpolicy = await formGroupDiv.findElement(
      By.css(".css-b62m3t-container")
    );

    // Find and click the dropdown control
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

    // Optionally, select one item
    const inputpolicy1 = await dropdownContainpolicy.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await inputpolicy1.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(200);
    await inputpolicy1.sendKeys(Key.ENTER);

    // Input field inside react-select
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

    // know before you go
    // Locate the label element for reference (optional, for scrolling or logging)
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

    // Add Description
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

    // pricing
    // click on Add Rate

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
    const checkboxs = await driver.wait(
      until.elementLocated(By.id("title")),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      checkboxs
    );
    await driver.sleep(300);

    await checkboxs.click();

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
  } finally {
  }
})();
