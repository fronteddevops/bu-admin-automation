const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");
const os = require("os");

(async function AddProduct() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.manage().window().maximize();
    await driver.get("http://192.168.29.67:5173/kanban");
    const emailInput = await driver.wait(
      until.elementLocated(By.css("input[name='email'][placeholder='Email']")),
      10000
    );

    await driver.wait(until.elementIsVisible(emailInput), 5000);
    await emailInput.click();
    await emailInput.sendKeys("admin@gmail.com");

    await driver.sleep(2000);

    const passwordInput = await driver.wait(
      until.elementLocated(
        By.css("input[name='password'][placeholder='Password']")
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(passwordInput), 5000);
    await passwordInput.click();
    await passwordInput.sendKeys("admin123");

    await driver.sleep(2000);

    const signInBtn = await driver.wait(
      until.elementLocated(By.id("kt_sign_in_submit")),
      10000
    );

    await driver.wait(until.elementIsVisible(signInBtn), 5000);
    await driver.wait(until.elementIsEnabled(signInBtn), 5000);
    await signInBtn.click();

    await driver.sleep(2000);

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

    const yesButton = await driver.wait(
      until.elementLocated(
        By.css("button.modal-success-button.btn.btn-primary")
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(yesButton), 5000);
    await driver.wait(until.elementIsEnabled(yesButton), 5000);
    await yesButton.click();

    await driver.sleep(2000);

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

    console.log("containercountry", containercountry);

    const selects = await containercountry.findElement(By.tagName("select"));
    console.log("selects", selects);
    const optionscountry = await selects.findElements(By.tagName("option"));
    console.log("optionscountry", optionscountry);

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

    //  Media And Description

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

    // important info
    // Add Range

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

    // Rooms
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
    await driver.sleep(2000);

    await saveNextBtn.click();

    const addressLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Address']")
      ),
      3000
    );

    const addressContainer = await addressLabel.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const addressInputs = await addressContainer.findElement(
      By.css("input.form-control")
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      addressInputs
    );
    await driver.sleep(2000);
    await addressInputs.clear();
    await addressInputs.sendKeys("vijay nagar indore");

    // Choose a country

    const labelselectcountry = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Choose a country:']")
      ),
      3000
    );

    const containerselectcountry = await labelselectcountry.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const selectcountry = await containerselectcountry.findElement(
      By.tagName("select")
    );

    const optionscountryselect = await selectcountry.findElements(
      By.tagName("option")
    );

    await driver.sleep(2000);

    if (optionscountryselect.length > 2) {
      await optionscountryselect[2].click();
    } else {
      console.warn("Not enough options to select index 2.");
    }

    await driver.sleep(2000);

    // choose a state

    const labelselectstate = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Choose a States:']")
      ),
      2000
    );

    const containerselectstate = await labelselectstate.findElement(
      By.xpath("ancestor::div[contains(@class, 'mb-3')]")
    );

    const selectstate = await containerselectstate.findElement(
      By.tagName("select")
    );

    const optionstateselect = await selectstate.findElements(
      By.tagName("option")
    );

    await driver.sleep(2000);

    if (optionstateselect.length > 2) {
      await optionstateselect[2].click();
    } else {
      console.warn("Not enough options to select index 2.");
    }

    await driver.sleep(2000);

    // escapped some select like choose state , city and post code (currenty data not received)

    // click on save and next button

    // const saveAndNextButton = await driver.wait(
    //   until.elementLocated(
    //     By.xpath(
    //       "//button[contains(text(), 'Save and Next') and contains(@class, 'save-and-next-button')]"
    //     )
    //   ),
    //   10000
    // );
    // console.log("saveAndNextButton",saveAndNextButton)

    // await driver.executeScript(
    //   "arguments[0].scrollIntoView(true);",
    //   saveAndNextButton
    // );
    // await driver.wait(until.elementIsVisible(saveAndNextButton), 5000);
    // await driver.wait(until.elementIsEnabled(saveAndNextButton), 5000);
    // await saveAndNextButton.click();
    const saveAndNextButton = await driver.wait(
      until.elementLocated(
        By.xpath("//button[normalize-space(text())='Save and Next']")
      ),
      3000
    );

    await driver.wait(until.elementIsVisible(saveAndNextButton), 5000);
    await driver.wait(until.elementIsEnabled(saveAndNextButton), 5000);

    // Click the button
    await saveAndNextButton.click();

    // inclusion and exclusion

    // Locate label directly

    // Wait for the label element
    const labelInclusion = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space(text())='What is Include in your Expirience ?']"
        )
      ),
      2000
    );

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

    // click on save button in availability

    const saveButtonAgain = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[normalize-space(text())='Save' and contains(@class, 'save-and-next-button')]"
        )
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(saveButtonAgain), 5000);
    await driver.wait(until.elementIsEnabled(saveButtonAgain), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      saveButtonAgain
    );
    await driver.sleep(200);

    await saveButtonAgain.click();

    // check in and check out

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

    // click on check availability button

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
      await driver.wait(until.stalenessOf(blockingElement), 5000); // wait until dropdown is gone
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

    // Step 2: Scroll, ensure visibility, and click
    await driver.executeScript(
      "arguments[0].scrollIntoView({block: 'center'});",
      dateInput
    );
    await driver.wait(until.elementIsVisible(dateInput), 3000);
    await driver.wait(until.elementIsEnabled(dateInput), 3000);

    // Step 3: Click safely
    await driver.sleep(200);
    await dateInput.click();

    // click on date
    const day26 = await driver.wait(
      until.elementLocated(By.css(".react-datepicker__day--026")),
      10000
    );

    await day26.click();

    // click on color
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
    await driver.sleep(500); // Wait for any animation to complete
    await driver.executeScript("arguments[0].click();", closeButton); // Force click

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

    // pirce section
    // click add rate

    const addRateButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Add Rate']")),
      10000
    );
    await addRateButton.click();

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

    console.log("alertchecking............");

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
    await driver.sleep(2000);
    // click on Add Task

    const addTasksBtn = await driver.wait(
      until.elementLocated(By.xpath('//button[text()="Add Tasks"]')),
      10000
    );

    await driver.wait(until.elementIsVisible(addTasksBtn), 5000);
    await driver.wait(until.elementIsEnabled(addTasksBtn), 5000);

    await addTasksBtn.click();

    // Add Title
    await driver.sleep(2000);
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

    await driver.sleep(2000);

    await driver.wait(until.elementIsVisible(startTimeInput), 5000);
    await driver.wait(until.elementIsEnabled(startTimeInput), 5000);

    await startTimeInput.click();
    await startTimeInput.clear(); //
    await driver.sleep(2000);
    await startTimeInput.sendKeys("04:50");

    // click on save button

    const saveButtonTask = await driver.wait(
      until.elementLocated(By.xpath('//button[text()="Save"]')),
      10000
    );

    await driver.wait(until.elementIsVisible(saveButtonTask), 5000);
    await driver.wait(until.elementIsEnabled(saveButtonTask), 5000);

    await saveButtonTask.click();

    // click to save and next

    const saveNextButtontask = await driver.wait(
      until.elementLocated(
        By.xpath('//button[normalize-space()="Save and Next"]')
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(saveNextButtontask), 5000);
    await driver.wait(until.elementIsEnabled(saveNextButtontask), 5000);

    await saveNextButtontask.click();

    // faq save and next
    const saveNextButtonFaq = await driver.wait(
      until.elementLocated(
        By.xpath('//button[normalize-space()="Save and Next"]')
      ),
      10000
    );

    await driver.wait(until.elementIsVisible(saveNextButtonFaq), 5000);
    await driver.wait(until.elementIsEnabled(saveNextButtonFaq), 5000);

    await saveNextButtonFaq.click();
  } finally {
  }
})();
