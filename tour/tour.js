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

    // Scroll into view
    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
      experienceCodeInput
    );

    // Clear and enter the code
    await experienceCodeInput.clear();
    await experienceCodeInput.sendKeys("exp-325");
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

    const stateContainer1 = await driver.findElement(
      By.xpath(
        "//div[contains(@class, 'col-md-3')][.//label[@for='state-1' and contains(text(), 'Choose a State:')]]"
      )
    );

    // Step 2: Find the <select> inside that container
    const stateSelect1 = await stateContainer1.findElement(
      By.tagName("select")
    );

    // Step 3: Scroll into view
    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
      stateSelect1
    );

    const stateOptions1 = await stateSelect1.findElements(By.tagName("option"));

    await stateOptions1[2].click();

    // choose a city

    const cityContainer1 = await driver.findElement(
      By.xpath(
        "//div[contains(@class, 'col-md-3')][.//label[@for='city-1' and contains(text(), 'Choose a City:')]]"
      )
    );

    const citySelect1 = await cityContainer1.findElement(By.tagName("select"));

    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
      citySelect1
    );

    const cityOptions1 = await citySelect1.findElements(By.tagName("option"));

    await cityOptions1[1].click();

    // experience
    // Step 1: Find the container
    const experienceTypeContainer = await driver.findElement(
      By.xpath("//div[contains(@class, 'mb-3')][.//label[contains(text(), 'What is the Type of your Experience')]]")
    );

    // Step 2: Find the input inside react-select
    const reactSelectInput = await experienceTypeContainer.findElement(
      By.css("input[id^='react-select'][type='text']")
    );

    // Step 3: Scroll into view
    await driver.executeScript(
      "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
      reactSelectInput
    );

    // Step 4: Open dropdown
    await reactSelectInput.click();
    await driver.sleep(500);

    // Step 5: Select "Private"
    let privateOption = await driver.findElement(By.xpath("//div[contains(@class, 'css-10wo9uf-option') and text()='Private']"));
    await privateOption.click();

    // Step 6: Reopen dropdown and select "Group"
    await reactSelectInput.click();
    await driver.sleep(500);

    let groupOption = await driver.findElement(By.xpath("//div[contains(@class, 'css-10wo9uf-option') and text()='Group']"));
    await groupOption.click();

  } finally {
  }
})();
