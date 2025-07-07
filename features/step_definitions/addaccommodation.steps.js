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
setDefaultTimeout(120 * 1000);

Before(async function () {
  console.log("Launching browser...");
  driver = await new Builder().forBrowser("chrome").build();
  console.log("Browser launched.");
  await driver.manage().window().maximize();
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});

Given(
  "I am logged in as admin Accommodation",
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

Then("Select Accommodation and Click on Add Products", async function () {
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

  await driver.sleep(2000);

  const accommodationBtn = await driver.wait(
    until.elementLocated(By.xpath("//button[text()='Accommodation']")),
    10000
  );

  await driver.wait(until.elementIsVisible(accommodationBtn), 5000);
  await accommodationBtn.click();

  await driver.sleep(2000);

  const addProductsBtn = await driver.wait(
    until.elementLocated(By.xpath("//button[contains(., 'Add Products')]")),
    10000
  );

  await driver.wait(until.elementIsVisible(addProductsBtn), 5000);
  await driver.wait(until.elementIsEnabled(addProductsBtn), 5000);
  await addProductsBtn.click();
  await driver.sleep(2000);

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

When(
  "Basic Info - Enter Experience Code, Select Experience Theme, Categories Experience , Address, country, States, City, Postal Code",
  async function () {
    const codeInput = await driver.wait(
      until.elementLocated(By.id("experienceCode")),
      10000
    );

    await driver.wait(until.elementIsVisible(codeInput), 5000);
    await codeInput.click();
    await codeInput.sendKeys("exp-324");
    await driver.sleep(4000);

    /////////////////////////////
    const labelss = await driver.findElement(
      By.xpath(
        "//label[normalize-space(text())='Choose the Themes that best describe your Experience']"
      )
    );

    // 2. Get parent container
    const containerss = await labelss.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    // 3. Click to open the react-select dropdown
    const dropdownControl = await containerss.findElement(
      By.css(".css-13cymwt-control")
    );
    await dropdownControl.click();

    // 4. Wait for the options container to load
    await driver.wait(
      until.elementLocated(By.css("[id^='react-select'][id$='-option-0']")),
      5000
    );

    // 5. Select the first option
    const option1s = await driver.findElement(
      By.css("[id^='react-select'][id$='-option-0']")
    );
    await option1s.click();

    // 6. Reopen the dropdown again to select the second option
    // const dropdownControl1 = await containerss.findElement(By.css(".css-13cymwt-control"));
    // await dropdownControl1.click();
    // await driver.wait(until.elementLocated(By.css("[id^='react-select'][id$='-option-1']")), 5000);

    // const option2s = await driver.findElement(By.css("[id^='react-select'][id$='-option-1']"));
    // await option2s.click();

    ////////////////////////////////

    await driver.sleep(4000);
    const selectInput = await driver.wait(
      until.elementLocated(By.id("react-select-2-input")),
      10000
    );

    await driver.wait(until.elementIsVisible(selectInput), 5000);
    await selectInput.click();

    const multiSelectInput = await driver.wait(
      until.elementLocated(By.id("react-select-3-input")),
      10000
    );

    await driver.wait(until.elementIsVisible(multiSelectInput), 5000);
    await multiSelectInput.click();
    await driver.sleep(1000);

    // Select first item
    // await multiSelectInput.sendKeys(Key.ARROW_DOWN);
    // await driver.sleep(500);
    // await multiSelectInput.sendKeys(Key.ENTER);

    // await driver.sleep(500);

    // await multiSelectInput.sendKeys(Key.ARROW_DOWN);
    // await driver.sleep(500);
    // await multiSelectInput.sendKeys(Key.ENTER);

    // await driver.sleep(1000);
    const option1 = await driver.findElement(By.id("react-select-3-option-0"));
    await option1.click();
    const option2 = await driver.findElement(By.id("react-select-3-option-1"));
    await option2.click();

    await driver.sleep(1000);

    const addressInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[text()='Address']/following-sibling::input[@type='text']"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
      addressInput
    );
    await driver.wait(until.elementIsVisible(addressInput), 5000);
    await addressInput.click();
    // await addressInput.sendKeys("Your Address Here");

    // const dropdown = await driver.wait(
    //   until.elementLocated(By.id("dropdown")),
    //   10000
    // );

    // await driver.wait(until.elementIsVisible(dropdown), 5000);
    // await dropdown.click();

    // await driver.sleep(1000);

    // await dropdown
    //   .findElement(
    //     By.css("option[value='7ce6a9f0-43e7-416a-aba7-3c21a242da16']")
    //   )
    //   .click();

    const dropdownscountry = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[text()='Choose a country:']/following-sibling::select"
        )
      ),
      4000
    );

    await driver.wait(until.elementIsVisible(dropdownscountry), 5000);
    await driver.wait(until.elementIsEnabled(dropdownscountry), 5000);
    await dropdownscountry.click();
    await driver.sleep(4000);

    const labelc = await driver.findElement(
      By.xpath("//label[normalize-space(text())='Choose a States:']")
    );

    const containercountry = await labelc.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const selects = await containercountry.findElement(By.tagName("select"));
    const optionscountry = await selects.findElements(By.tagName("option"));

    for (const option of optionscountry) {
      const text = await option.getText();
      if (text.trim().toLowerCase() !== "select...") {
        await option.click();
        break;
      }
    }

    await driver.sleep(2000);
    const dropdowns = await driver.wait(
      until.elementLocated(
        By.xpath("//label[text()='Choose a States:']/following-sibling::select")
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(dropdowns), 5000);
    await driver.wait(until.elementIsEnabled(dropdowns), 5000);
    await dropdowns.click();

    const label = await driver.findElement(
      By.xpath("//label[normalize-space(text())='Choose a States:']")
    );

    const container = await label.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const select = await container.findElement(By.tagName("select"));

    const options = await select.findElements(By.tagName("option"));

    for (const option of options) {
      const text = await option.getText();
      if (text.trim().toLowerCase() !== "select...") {
        await option.click();
        break;
      }
    }
    await driver.sleep(2000);

    // choose a city
    const dropdowns1 = await driver.wait(
      until.elementLocated(
        By.xpath("//label[text()='Choose a City:']/following-sibling::select")
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(dropdowns1), 5000);
    await driver.wait(until.elementIsEnabled(dropdowns1), 5000);
    await dropdowns1.click();

    const label1 = await driver.findElement(
      By.xpath("//label[normalize-space(text())='Choose a City:']")
    );
    const container1 = await label1.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const select1 = await container1.findElement(By.tagName("select"));
    const options1 = await select1.findElements(By.tagName("option"));

    for (const option of options1) {
      const text = await option.getText();
      if (text.trim().toLowerCase() !== "select...") {
        await option.click();
        break;
      }
    }

    await driver.sleep(2000);

    // Post Code
    const labels = await driver.findElement(
      By.xpath("//label[normalize-space(text())='Post Code:']")
    );

    const containers = await labels.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const input = await containers.findElement(By.tagName("input"));
    await label.click();
    await input.clear();
    await input.sendKeys("560001");
    await driver.sleep(2000);

    // click on button Save and Next
    const button = await driver.findElement(
      By.xpath("//button[normalize-space(text())='Save and Next']")
    );
    await button.click();
  }
);

When(
  "Media & Description- Traveller Experience, Photos Experience, Videos Experience",
  async function () {
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
  }
);

When(
  "Important Info- Age Range, Want to Bring, Cancellation Policy, Child, Smoking, Parties and Pets",
  async function () {
    const ageLabel = await driver.wait(
      until.elementLocated(By.xpath("//label[contains(text(), 'Age Range')]")),
      10000
    );

    const containerage = await ageLabel.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const selectBox = await containerage.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript("arguments[0].scrollIntoView(true);", selectBox);
    await driver.sleep(500);
    await selectBox.click();

    await driver.wait(
      until.elementLocated(By.css("[id^='react-select'][id$='-option-0']")),
      5000
    );
    await driver.sleep(2000);

    const optionage = await driver.findElement(
      By.css("[id^='react-select'][id$='-option-0']")
    );
    await optionage.click();

    // What to Bring

    //     const bringLabel = await driver.wait(
    //   until.elementLocated(By.xpath("//label[contains(text(), 'What to Bring')]")),
    //   10000
    // )

    // const containerages = await bringLabel.findElement(
    //   By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    // );
    //  await containerages.click();

    // const selectBoxes = await containerages.findElement(
    //   By.css(".css-13cymwt-control")
    // );

    // await driver.executeScript("arguments[0].scrollIntoView(true);", selectBoxes);
    // await driver.sleep(500);
    // await selectBoxes.click();

    // await driver.wait(
    //       until.elementLocated(By.css("[id^='react-select'][id$='-option-0']")),
    //       5000
    //     );
    //     await driver.sleep(2000);

    //     const optionbring = await driver.findElement(
    //       By.css("[id^='react-select'][id$='-option-0']")
    //     );
    //     await optionbring.click();

    // Cancellation Policy

    const policyLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space()='Cancellation Policy']")
      ),
      10000
    );

    // Step 2: Find the parent container with class "mb-3"
    const containerpolicy = await policyLabel.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    // Step 3: Find and click the react-select control box
    const dropdownControlpolicy = await containerpolicy.findElement(
      By.css(".css-13cymwt-control")
    );
    await dropdownControlpolicy.click();

    await driver.sleep(1000);
    // Step 4: Wait for dropdown input and focus
    const inputpolicy = await driver.wait(
      until.elementLocated(By.css("input[id^='react-select'][id$='-input']")),
      1000
    );
    await inputpolicy.click();
    await driver.sleep(1000);

    // Step 5: Select the first option
    // const firstOptionpolicy = await driver.wait(
    //   until.elementLocated(By.css("[id^='react-select'][id$='-option-0']")),
    //   5000
    // );
    // await firstOptionpolicy.click();

    const childLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Child']")
      ),
      5000
    );

    // Step 2: Find the input associated with the label (assuming same parent <div>)
    const parentDiv = await childLabel.findElement(By.xpath(".."));
    const childInput = await parentDiv.findElement(By.css("input"));

    // Step 3: Click the input and type value
    await childInput.click();
    await childInput.clear();
    await childInput.sendKeys("2");
    await driver.sleep(4000);

    // smoking
    const smokingLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Smoking']")
      ),
      5000
    );

    // Step 2: Find the input associated with the label (assuming same parent <div>)
    const smparentDiv = await smokingLabel.findElement(By.xpath(".."));
    const smchildInput = await smparentDiv.findElement(By.css("input"));

    // Step 3: Click the input and type value
    await smchildInput.click();
    await smchildInput.clear();
    await smchildInput.sendKeys("No");
    await driver.sleep(4000);

    // Parties

    const partyLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Parties']")
      ),
      5000
    );

    // Step 2: Find the input associated with the label (assuming same parent <div>)
    const partyparentDiv = await partyLabel.findElement(By.xpath(".."));
    const partychildInput = await partyparentDiv.findElement(By.css("input"));

    // Step 3: Click the input and type value
    await partychildInput.click();
    await partychildInput.clear();
    await partychildInput.sendKeys("No");
    await driver.sleep(4000);

    // Pets

    const petsLabel = await driver.wait(
      until.elementLocated(By.xpath("//label[normalize-space(text())='Pets']")),
      5000
    );

    // Step 2: Find the input associated with the label (assuming same parent <div>)
    const petsparentDiv = await petsLabel.findElement(By.xpath(".."));
    const petschildInput = await petsparentDiv.findElement(By.css("input"));

    // Step 3: Click the input and type value
    await petschildInput.click();
    await petschildInput.clear();
    await petschildInput.sendKeys("No");
    await driver.sleep(4000);

    // click save and next button
    const saveNextButton = await driver.wait(
      until.elementLocated(
        By.xpath("//button[normalize-space(text())='Save and Next']")
      ),
      5000
    );

    await driver.wait(until.elementIsVisible(saveNextButton), 5000);
    await driver.wait(until.elementIsEnabled(saveNextButton), 5000);

    // Click the button
    await saveNextButton.click();
  }
);

When(
  "Room - Click Add Room, Code, Title & Description, Room Type, Room Category, Room Attribute, Amenities, Number of People, types of room, Close Room",
  async function () {
    const Addbutton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Add Room')]")),
      10000 // wait max 10 seconds
    );

    await driver.wait(until.elementIsVisible(Addbutton), 5000);
    await Addbutton.click();

    // image upload on drag and drop
    const downloadsFolderDrag = path.join(os.homedir(), "Downloads");
    const imagePaths = path.join(
      downloadsFolderDrag,
      "istockphoto-1798864003-2048x2048.jpg"
    );
    // const fileInputs = await driver.findElement(By.id("imageUpload"));
    const containerfile = await driver.findElement(
      By.xpath(
        "//label[contains(text(),'Drag and drop your images here or click to add.')]/ancestor::div[contains(@class, 'border')]"
      )
    );

    // Now locate the input[type='file'] inside this container
    const fileInputfile = await containerfile.findElement(
      By.css("input[type='file']")
    );
    await fileInputfile.sendKeys(imagePaths);
    await driver.sleep(2000);

    // enete code
    const inputenetercode = await driver.wait(
      until.elementLocated(By.css("input[placeholder='enter code']")),
      10000
    );
    await driver.wait(until.elementIsVisible(inputenetercode), 5000);

    await inputenetercode.click();
    await inputenetercode.clear();
    await inputenetercode.sendKeys("ex9s8ss98");
    await driver.sleep(2000);

    // select title and Description

    const labeltitleanddesc = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Title & Description']")
      ),
      10000
    );
    await driver.sleep(2000);

    const containertitleanddesc = await labeltitleanddesc.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );
    const selectControl = await containertitleanddesc.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      selectControl
    );
    await driver.sleep(500);
    await selectControl.click();

    const inputtitleanddesc = await driver.wait(
      until.elementLocated(By.css("input[id^='react-select'][id$='-input']")),
      5000
    );

    await inputtitleanddesc.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(300);
    await inputtitleanddesc.sendKeys(Key.ENTER);

    // await inputtitleanddesc.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(300);
    await inputtitleanddesc.sendKeys(Key.ENTER);

    // select language click English
    await driver.sleep(2000);

    async function clickLanguageButton(languageName) {
      const button = await driver.wait(
        until.elementLocated(
          By.xpath(`//button[normalize-space()='${languageName}']`)
        ),
        5000
      );
      await driver.executeScript("arguments[0].scrollIntoView(true);", button);
      await driver.sleep(300);
      await button.click();
    }

    // Example usage
    await clickLanguageButton("Spanish");

    const titleInput = await driver.wait(
      until.elementLocated(By.css("input[placeholder='Enter title ...']")),
      5000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      titleInput
    );
    await driver.sleep(300);
    await titleInput.click();
    await titleInput.clear(); // optional: clear previous value
    await titleInput.sendKeys("this is good language");

    const shortDescLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Short Description']")
      ),
      10000
    );

    // Find the input related to this label
    const containerShortDesc = await shortDescLabel.findElement(
      By.xpath("ancestor::div")
    );
    const inputShortDesc = await containerShortDesc.findElement(
      By.css("input[placeholder='Enter short description ...']")
    );

    // Scroll into view and type
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      inputShortDesc
    );
    await driver.sleep(300);
    await inputShortDesc.clear(); // Clear if needed
    await inputShortDesc.sendKeys("short desc");

    const longDescLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Long Description']")
      ),
      10000
    );

    // Find the textarea relative to the label
    const containerLongDesc = await longDescLabel.findElement(
      By.xpath("ancestor::div")
    );
    const textareaLongDesc = await containerLongDesc.findElement(
      By.css("textarea[placeholder='Enter long description ...']")
    );

    // Scroll into view and type
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      textareaLongDesc
    );
    await driver.sleep(300);
    await textareaLongDesc.clear(); // Optional: clear existing text
    await textareaLongDesc.sendKeys("long desc");

    // long desc ene

    // const saveButtons = await driver.findElements(By.css("button.modal-success-button"));

    // for (const button of saveButtons) {
    //   const text = await button.getText();
    //   if (text.trim().toLowerCase() === "save") {
    //     await driver.executeScript("arguments[0].scrollIntoView(true);", button);
    //     await driver.sleep(300);
    //     await driver.executeScript("arguments[0].click();", button);
    //     break;
    //   }
    // }

    const saveaButton = await driver.wait(
      until.elementLocated(
        By.css(
          "#kt_app_body > div:nth-child(8) > div > div > div.bg-transparent.px-3.pt-3.modal-footer > button.modal-success-button"
        )
      ),
      10000
    );

    // Scroll into view in case it's out of the viewport
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      saveaButton
    );
    await driver.sleep(500); // Optional wait if animation

    // Use JS-based click to avoid intercept errors
    await driver.executeScript("arguments[0].click();", saveaButton);

    // Select Room Type

    // const labelroomtype = await driver.wait(
    //   until.elementLocated(By.xpath("//label[normalize-space(text())='Room Type']")),
    //   10000
    // );
    // await driver.sleep(2000);

    // const containerroomtype = await labelroomtype.findElement(
    //   By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    // );
    // const selectControlroomtype = await containerroomtype.findElement(
    //   By.css(".css-13cymwt-control")
    // );

    // await driver.executeScript("arguments[0].scrollIntoView(true);", selectControlroomtype);
    // await driver.sleep(500);
    // await selectControl.click();

    // const inputroomtype = await driver.wait(
    //   until.elementLocated(By.css("input[id^='react-select'][id$='-input']")),
    //   5000
    // );

    // await inputroomtype.sendKeys(Key.ARROW_DOWN);
    // await driver.sleep(300);
    // await inputroomtype.sendKeys(Key.ENTER);

    // await inputroomtype.sendKeys(Key.ARROW_DOWN);
    // await driver.sleep(300);
    // await inputroomtype.sendKeys(Key.ENTER);

    // Select Room Type

    const labelroomtype = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Room Type']")
      ),
      10000
    );
    await driver.sleep(2000);

    const containerroomtype = await labelroomtype.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const selectControlroomtype = await containerroomtype.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      selectControlroomtype
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", selectControlroomtype);

    const inputroomtype = await selectControlroomtype.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await inputroomtype.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(300);
    await inputroomtype.sendKeys(Key.ENTER);

    await inputroomtype.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(300);
    await inputroomtype.sendKeys(Key.ENTER);

    //Room Category

    const labelroomcategory = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Room Category']")
      ),
      10000
    );
    await driver.sleep(2000);

    const containerroomcategory = await labelroomcategory.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const selectControlroomcategory = await containerroomcategory.findElement(
      By.css(".css-13cymwt-control")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      selectControlroomcategory
    );
    await driver.sleep(500);
    await driver.executeScript(
      "arguments[0].click();",
      selectControlroomcategory
    );

    const inputroomcategroy = await selectControlroomcategory.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await inputroomcategroy.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(300);
    await inputroomcategroy.sendKeys(Key.ENTER);

    await inputroomcategroy.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(300);
    await inputroomcategroy.sendKeys(Key.ENTER);

    // Room Attribute

    const labelroomattribute = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Room Attribute']")
      ),
      10000
    );
    await driver.sleep(2000);

    const containerroomattribute = await labelroomattribute.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const selectControlroomattribute = await containerroomattribute.findElement(
      By.css(".css-13cymwt-control")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      selectControlroomattribute
    );
    await driver.sleep(500);
    await driver.executeScript(
      "arguments[0].click();",
      selectControlroomattribute
    );

    const inputroomattribute = await selectControlroomattribute.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );

    await inputroomattribute.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(1000);
    await inputroomattribute.sendKeys(Key.ENTER);

    await inputroomattribute.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(1000);
    await inputroomattribute.sendKeys(Key.ENTER);

    // Amenities

    const labelroomamenities = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Amenities']")
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

    // Number of People

    const labelpeople = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Number of People']")
      ),
      10000
    );

    const containerpeople = await labelpeople.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const inputpeople = await containerpeople.findElement(
      By.css("input[type='number']")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      inputpeople
    );
    await driver.sleep(300);
    await inputpeople.click();

    await inputpeople.clear();
    await inputpeople.sendKeys("5");

    // how many these

    const labelp = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='How many of these types of rooms do you have in this establishment']"
        )
      ),
      10000
    );

    const containerp = await labelp.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const inputp = await containerp.findElement(By.css("input[type='number']"));

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      inputp
    );
    await driver.sleep(300);
    await inputp.click();

    await inputp.clear();
    await inputp.sendKeys("3");

    // close Room

    const closeRoomLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Close Room']")
      ),
      3000
    );

    const closeRoomContainer = await closeRoomLabel.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const closeRoomInput = await closeRoomContainer.findElement(
      By.css("input[type='number']")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      closeRoomInput
    );
    await driver.sleep(300);
    await closeRoomInput.click();
    await closeRoomInput.clear();
    await closeRoomInput.sendKeys("2");

    // click on save button

    const saveButton = await driver.wait(
      until.elementLocated(By.css("button.modal-success-button")),
      3000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveButton
    );
    await driver.sleep(2000);

    await saveButton.click();

    // click on save and next button

    const saveNextBtn = await driver.wait(
      until.elementLocated(By.css("button.save-and-next-button")),
      3000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveNextBtn
    );
    await saveNextBtn.click();
    await driver.sleep(1000);

    const saveAndNextBtn = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveAndNextBtn
    );
    await driver.wait(until.elementIsVisible(saveAndNextBtn), 5000);
    await driver.wait(until.elementIsEnabled(saveAndNextBtn), 5000);

    await saveAndNextBtn.click();
    await driver.sleep(1000);
  }
);

When(
  "Incluson & Exclusion- Select Include Experience and Select not Inculde Experience",
  async function () {
    // Get the nearest container div that contains the select box
    const containerInclusion = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='What is Include in your Expirience ?']/following-sibling::div[contains(@class, 'mb-4')]"
        )
      ),
      2000
    );

    // Locate the select dropdown control
    const selectControlInclusion = await containerInclusion.findElement(
      By.css(".css-13cymwt-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      selectControlInclusion
    );
    await driver.sleep(500);
    await selectControlInclusion.click();

    const inputInclusion = await driver.wait(
      until.elementLocated(By.css("input[id^='react-select'][id$='-input']")),
      5000
    );

    await inputInclusion.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(2000);
    await inputInclusion.sendKeys(Key.ENTER);

    // await inputInclusion.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(2000);
    await inputInclusion.sendKeys(Key.ENTER);

    await driver.sleep(2000);

    const labelExclusion = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='What is NOT Include in your Expirience ?']"
        )
      ),
      10000
    );

    // Scope to correct container
    const containerExclusion = await labelExclusion.findElement(
      By.xpath("./following-sibling::div[contains(@class, 'mb-4')]")
    );

    // Find and click select control
    const selectControlExclusion = await containerExclusion.findElement(
      By.css(".css-13cymwt-control")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      selectControlExclusion
    );
    await driver.sleep(300);
    await selectControlExclusion.click();

    // Find input only within exclusion container
    const inputExclusion = await containerExclusion.findElement(
      By.css("input[id^='react-select'][id$='-input']")
    );
    await inputExclusion.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(200);
    await inputExclusion.sendKeys(Key.ARROW_DOWN, Key.ENTER);

    await driver.sleep(2000);
    const saveAndNextButtonex = await driver.wait(
      until.elementLocated(By.css("button.save-and-next-button")),
      10000
    );

    await driver.wait(until.elementIsVisible(saveAndNextButtonex), 5000);
    await driver.wait(until.elementIsEnabled(saveAndNextButtonex), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveAndNextButtonex
    );
    await driver.sleep(200);
    await saveAndNextButtonex.click();

    // click on save button
    const saveButtondate = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[normalize-space(text())='Save' and contains(@class, 'save-and-next-button')]"
        )
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(saveButtondate), 5000);
    await driver.wait(until.elementIsEnabled(saveButtondate), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveButtondate
    );
    await driver.sleep(200);

    await saveButtondate.click();
    await driver.sleep(500);
  }
);

When(
  "Booking Off- Enter Weeks, Days, Hours, Minutes And Click on Save",
  async function () {
    // Enter Weeks
    const weeksLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Weeks']")
      ),
      10000
    );

    const weeksInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='Weeks']/following-sibling::input"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      weeksInput
    );
    await weeksInput.click();
    await weeksInput.clear();
    await weeksInput.sendKeys("5");

    // Enter Days
    const daysLabel = await driver.wait(
      until.elementLocated(By.xpath("//label[normalize-space(text())='Days']")),
      10000
    );

    const daysInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='Days']/following-sibling::input"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      daysInput
    );
    await daysInput.click();
    await daysInput.clear();
    await daysInput.sendKeys("4");

    // Enter Hours
    const hoursLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Hours']")
      ),
      10000
    );

    const hoursInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='Hours']/following-sibling::input"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      hoursInput
    );
    await hoursInput.click();
    await hoursInput.clear();
    await hoursInput.sendKeys("3");

    // Enter Minutes
    const minutesLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Minutes']")
      ),
      10000
    );

    const minutesInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='Minutes']/following-sibling::input"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      minutesInput
    );
    await minutesInput.click();
    await minutesInput.clear();
    await minutesInput.sendKeys("1");

    await driver.sleep(500);

    // Click on Save Button
    const saveButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save']"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveButton
    );
    await saveButton.click();
  }
);

When("Check In & Check out Time- Add Time", async function () {
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

  // click on check In timer

  const checkInTimeInput = await driver.wait(
    until.elementLocated(By.id("checkIn-time")),
    10000
  );

  // Wait for visibility and that it's enabled
  await driver.wait(until.elementIsVisible(checkInTimeInput), 5000);
  await driver.wait(until.elementIsEnabled(checkInTimeInput), 5000);

  // Scroll it into view and click it
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    checkInTimeInput
  );
  await driver.sleep(200);
  await checkInTimeInput.click();
  await checkInTimeInput.sendKeys("10:30");

  await driver.sleep(2000);

  // click on check Out timer

  const checkOutTimeInput = await driver.wait(
    until.elementLocated(By.id("  Check-Out-Time")),
    10000
  );

  // Wait for visibility and that it's enabled
  await driver.wait(until.elementIsVisible(checkOutTimeInput), 5000);
  await driver.wait(until.elementIsEnabled(checkOutTimeInput), 5000);

  // Scroll it into view and click it
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    checkOutTimeInput
  );
  await driver.sleep(200);
  await checkOutTimeInput.click();
  await checkOutTimeInput.sendKeys("18:30");

  await driver.sleep(2000);

  // click on save button
  const saveButtons = await driver.wait(
    until.elementLocated(By.css("button.modal-success-button")),
    3000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveButtons
  );
  await driver.sleep(2000);

  await saveButtons.click();

  // save and next button

  const saveAndNextBtn = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[normalize-space(text())='Save and Next' and contains(@class, 'save-and-next-button')]"
      )
    ),
    10000
  );

  // Wait until the button is visible and enabled
  await driver.wait(until.elementIsVisible(saveAndNextBtn), 5000);
  await driver.wait(until.elementIsEnabled(saveAndNextBtn), 5000);

  // Scroll into view and click
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    saveAndNextBtn
  );
  await driver.sleep(200);
  await saveAndNextBtn.click();
});

When(
  "Calender- Click Add Avaibiliy, Select Avaibility Rule,Select End Date, Affected Days, Select Rule Color,And Click on Save",
  async function () {
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

    // Add Availability
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

    await inputavaibility.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(2000);
    await inputavaibility.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(2000);
    await inputavaibility.sendKeys(Key.ARROW_DOWN);
    await driver.sleep(2000);
    await inputavaibility.sendKeys(Key.ENTER);

    // click outside
    await driver.executeScript("document.body.click()");
    await driver.sleep(300); // wait for dropdown to disappear
    // await driver.executeScript("alert('This is a test alert');");

    // Now proceed to click the date input
    // await dateInput.click();

    // date

    try {
      const blockingElement = await driver.findElement(
        By.css(".css-10wo9uf-option")
      );
      await driver.executeScript("document.body.click()");
      await driver.wait(until.stalenessOf(blockingElement), 5000);
    } catch (err) {
      // If dropdown not found or already closed, ignore
    }

    // Step 1: Find the date input using label-relative XPath
    // const dateInput = await driver.wait(
    //   until.elementLocated(
    //     By.xpath("#kt_app_body > div.fade.modal-container.modal.show > div > div > div.modal-body > div > div:nth-child(1) > div:nth-child(2) > div.react-datepicker-wrapper > div > input")
    //   ),
    //   10000
    // );

    const dateInput = await driver.wait(
      until.elementLocated(
        By.css(
          "#kt_app_body .modal.show .modal-body > div > div:nth-child(1) > div:nth-child(2) .react-datepicker-wrapper > div > input"
        )
      ),
      10000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      dateInput
    );
    await driver.wait(until.elementIsVisible(dateInput), 3000);
    await driver.wait(until.elementIsEnabled(dateInput), 3000);

    await driver.sleep(200);
    await dateInput.click();

    const day26 = await driver.wait(
      until.elementLocated(By.css(".react-datepicker__day--026")),
      10000
    );

    await day26.click();

    const patch = await driver.wait(
      until.elementLocated(By.css(".color-purple")),
      10000
    );

    await patch.click();

    // click on save button
    const saveButtonavaibility = await driver.wait(
      until.elementLocated(By.css("button.modal-success-button.w-100")),
      10000
    );

    await saveButtonavaibility.click();

    // click on view availability button
    const viewAvailabilityButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='View Availability']")),
      10000
    );

    await viewAvailabilityButton.click();

    const closeButton = await driver.wait(
      until.elementLocated(By.css("button.btn-close")),
      10000
    );

    await driver.wait(until.elementIsVisible(closeButton), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      closeButton
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", closeButton);

    // click on save button
    const saveButtonavaibilities = await driver.wait(
      until.elementLocated(By.css("button.save-and-next-button")),
      10000
    );

    await driver.wait(until.elementIsVisible(saveButtonavaibilities), 5000);
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveButtonavaibilities
    );
    await saveButtonavaibilities.click();
  }
);

When(
  "Pricing- Add Rate- Enter Code , Title, Start Date, End Date, Description, and Save",
  async function () {
    const addRateButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Add Rate']")),
      10000
    );
    await addRateButton.click();
    await driver.sleep(1000);

    // click on code

    const codeInputs = await driver.wait(
      until.elementLocated(By.css("input#code")),
      10000
    );

    await driver.wait(until.elementIsVisible(codeInputs), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      codeInputs
    );

    await codeInputs.clear();

    await codeInputs.sendKeys("ex5454");
    await driver.sleep(1000);

    // enter title
    const titleInputdata = await driver.wait(
      until.elementLocated(By.css("input#Title")),
      10000
    );

    console.log("titleInput:", titleInputdata);

    await driver.wait(until.elementIsVisible(titleInputdata), 5000);
    console.log("titleInput:", titleInputdata);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      titleInputdata
    );

    await titleInputdata.clear();

    await titleInputdata.sendKeys("My Sample Title");

    // click on start date
    const dateInputdata = await driver.wait(
      until.elementLocated(By.css("input#start-time")),
      10000
    );

    await driver.wait(until.elementIsVisible(dateInputdata), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      dateInputdata
    );

    await dateInputdata.click();
    await dateInputdata.sendKeys("01-07-2025");
    await driver.sleep(10000);

    // end date

    const enddateInputdata = await driver.wait(
      until.elementLocated(By.css("input#end-time")),
      10000
    );

    await driver.wait(until.elementIsVisible(enddateInputdata), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      enddateInputdata
    );

    await enddateInputdata.click();
    await enddateInputdata.sendKeys("01-12-2025");
    await driver.sleep(1000);

    // click on description

    const descriptionInput = await driver.wait(
      until.elementLocated(By.css("input#Description")),
      10000
    );

    await driver.wait(until.elementIsVisible(descriptionInput), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      descriptionInput
    );

    await descriptionInput.clear();

    await descriptionInput.sendKeys("This is a sample task description.");

    const memberInput = await driver.wait(
      until.elementLocated(By.css("input#member")),
      10000
    );

    await driver.wait(until.elementIsVisible(memberInput), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      memberInput
    );

    await memberInput.clear();

    await memberInput.sendKeys("3");

    // enter price

    const priceInput = await driver.wait(
      until.elementLocated(By.css("input#MaxPrice")),
      10000
    );

    await driver.wait(until.elementIsVisible(priceInput), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      priceInput
    );

    await priceInput.clear();

    await priceInput.sendKeys("25450");

    // const saveButtonses = await driver.wait(
    //   until.elementLocated(
    //     By.xpath(
    //       "//button[contains(@class, 'modal-success-button') and text()='Save']"
    //     )
    //   ),
    //   10000
    // );

    // await driver.wait(until.elementIsVisible(saveButtonses), 5000);
    // await driver.executeScript(
    //   "arguments[0].scrollIntoView({block: 'center'});",
    //   saveButtonses
    // );

    // await saveButtonses.click();
    // const saveButtonsession = await driver.wait(
    //     until.elementLocated(By.css("button.modal-success-button")),
    //     10000 // timeout in milliseconds
    //   );

    //   console.log

    //   await driver.wait(until.elementIsVisible(saveButtonsession), 5000);
    //   await driver.wait(until.elementIsEnabled(saveButtonsession), 5000);
    //   await saveButtonsession.click();
    await driver.sleep(1000);
    const saveButtonq = await driver.findElement(
      By.xpath(
        '//div[contains(@class, "modal-footer")]//button[contains(@class, "modal-success-button") and text()="Save"]'
      )
    );
    // const buttonText = await saveButtonq.getText(); // Get button's visible text
    await saveButtonq.click();

    const closeButtonmodal = await driver.findElement(
      By.xpath('//button[@class="btn-close" and @aria-label="Close"]')
    );
    console.log("closeButtonmodal", closeButtonmodal);
    await closeButtonmodal.click();

    const saveNxtButton = await driver.wait(
      until.elementLocated(By.css("button.save-and-next-button")),
      10000
    );

    await driver.wait(until.elementIsVisible(saveNxtButton), 5000);
    await driver.wait(until.elementIsEnabled(saveNxtButton), 5000);

    // Click the button
    await saveNxtButton.click();
    await driver.sleep(1000);
  }
);

When(
  "Task & Resources- Click on Add Task, Enter Title Task , Description, Start Time,  and Click on Save",
  async function () {
    // click on Add Task
    const addTasksBtn = await driver.wait(
      until.elementLocated(By.xpath('//button[text()="Add Tasks"]')),
      10000
    );

    await driver.wait(until.elementIsVisible(addTasksBtn), 5000);
    await driver.wait(until.elementIsEnabled(addTasksBtn), 5000);
    await addTasksBtn.click();
    await driver.sleep(1000);

    const addtitleInput = await driver.wait(
      until.elementLocated(By.xpath('//input[@placeholder="enter title"]')),
      10000
    );

    await driver.wait(until.elementIsVisible(addtitleInput), 5000);
    await driver.wait(until.elementIsEnabled(addtitleInput), 5000);

    await addtitleInput.click();
    await addtitleInput.clear();
    await addtitleInput.sendKeys("Your Task Title Here");

    // add description
    await driver.sleep(2000);
    const descriptionBox = await driver.wait(
      until.elementLocated(By.id("description")),
      10000
    );

    await driver.wait(until.elementIsVisible(descriptionBox), 5000);
    await driver.wait(until.elementIsEnabled(descriptionBox), 5000);

    await descriptionBox.click();
    await descriptionBox.clear();
    await descriptionBox.sendKeys("Your task description goes here");
    await driver.sleep(2000);

    // Start Time
    const startTimeInput = await driver.wait(
      until.elementLocated(By.id("start-time")),
      10000
    );

    await driver.sleep(1000);

    await driver.wait(until.elementIsVisible(startTimeInput), 5000);
    await driver.wait(until.elementIsEnabled(startTimeInput), 5000);

    await startTimeInput.click();
    await startTimeInput.clear(); //
    await driver.sleep(2000);
    await startTimeInput.sendKeys("04:50");
    await driver.sleep(1000);

    // click on save button
    const saveButtonTask = await driver.wait(
      until.elementLocated(By.xpath('//button[text()="Save"]')),
      10000
    );

    await driver.wait(until.elementIsVisible(saveButtonTask), 5000);
    await driver.wait(until.elementIsEnabled(saveButtonTask), 5000);

    await saveButtonTask.click();
    await driver.sleep(1000);

    const faqsaveandnext = await driver.findElement(
      By.xpath(
        "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
      )
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      faqsaveandnext
    );
    await driver.wait(until.elementIsVisible(faqsaveandnext), 5000);
    await driver.wait(until.elementIsEnabled(faqsaveandnext), 5000);
    await faqsaveandnext.click();
    await driver.sleep(1000);

    let saveAndNextButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[@type='submit' and contains(@class, 'save-and-next-button') and normalize-space(text())='Save and Next']"
        )
      ),
      10000
    );

    // Scroll into view
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      saveAndNextButton
    );

    // Ensure it's visible and enabled before clicking
    await driver.wait(until.elementIsVisible(saveAndNextButton), 5000);
    await driver.wait(until.elementIsEnabled(saveAndNextButton), 5000);

    await saveAndNextButton.click();

    await driver.sleep(500);
  }
);

When("Select Action and Activate", async function () {
  let dropdownButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[contains(text(),'Select Action')]")
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    dropdownButton
  );
  await driver.wait(until.elementIsVisible(dropdownButton), 5000);
  await dropdownButton.click();

  let firstItem = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//ul[@aria-labelledby='dropdownMenuButton1']//div[@class='dropdown-item' and normalize-space(text())='Active Product']"
      )
    ),
    5000
  );

  await driver.wait(until.elementIsVisible(firstItem), 5000);
  await firstItem.click();
  await driver.sleep(500);
  let accommodationButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[contains(@class, 'btn') and normalize-space(text())='Accommodation']"
      )
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    accommodationButton
  );

  await driver.wait(until.elementIsVisible(accommodationButton), 5000);
  await driver.wait(until.elementIsEnabled(accommodationButton), 5000);

  await accommodationButton.click();
  await driver.sleep(500)
});

When("Delete Added Data", async function () {
  // const targetCode = "exp-324";
  // const deleteButton = await driver.wait(
  //   until.elementLocated(
  //     By.xpath(
  //       `//tr[td[normalize-space(text())='${targetCode}']]//button[contains(@class, 'table-icon-remove')]`
  //     )
  //   ),
  //   10000
  // );

  // await driver.executeScript(
  //   "arguments[0].scrollIntoView({block: 'center'});",
  //   deleteButton
  // );

  // await deleteButton.click();
  // await driver.sleep(10000)

  //////////////////////////////////////
  let searchInput = await driver.wait(
    until.elementLocated(
      By.xpath("//input[@type='text' and @name='search' and @placeholder='Search...']")
    ),
    10000
  );
  
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", searchInput);
  
  await searchInput.clear();
  await searchInput.sendKeys("exp-324");
  await driver.sleep(10000)


  // Click on Delete Button 
  let deleteButton = await driver.wait(
    until.elementLocated(
      By.xpath("//tr[td[contains(text(),'exp-324')]]//button[contains(@class, 'table-icon-remove')]")
    ),
    5000
  );
  
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", deleteButton);
  await driver.wait(until.elementIsVisible(deleteButton), 5000);
  await deleteButton.click();
  await driver.sleep(2000)

  // Click on  Yes Button for confirm Delete
    let yesButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[contains(@class, 'modal-success-button') and normalize-space(text())='Yes']")
    ),
    5000
  );
  
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", yesButton);
  
  await driver.wait(until.elementIsVisible(yesButton), 5000);
  await driver.wait(until.elementIsEnabled(yesButton), 5000);
  
  await yesButton.click();

  
});
