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

   

// Step 1: Find the scoped container first (adjust class to your local wrapper)
const localContainer = await driver.findElement(
  By.css("div.step-form") // ← update this if needed
);

// Step 2: Now search the button inside that local container only
const localSaveButton = await localContainer.findElement(
  By.xpath(".//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']")
);

// Step 3: Scroll into view
await driver.executeScript(
  "arguments[0].scrollIntoView({block: 'center'});",
  localSaveButton
);

// Step 4: Wait for visibility & enabled state
await driver.wait(until.elementIsVisible(localSaveButton), 5000);
await driver.wait(until.elementIsEnabled(localSaveButton), 5000);

// Step 5: Click
await localSaveButton.click();


    
  } finally {
  }
})();
