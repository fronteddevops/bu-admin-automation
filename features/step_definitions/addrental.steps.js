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
  // in avaibility time date or pass  there click on save
//   const clickOnSave = await driver.findElement(By.css(".save-and-next-button"));
//   await driver.executeScript("arguments[0].scrollIntoView(true);", clickOnSave);
//   await clickOnSave.click();

});

// Media and Description

Then("Tell your travelers what the experience is all about", async function () {
  const labeldescexp = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//label[normalize-space(text())='Tell your travelers what the experience is all about']"
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
  await driver.sleep(10000);
});
