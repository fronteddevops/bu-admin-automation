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
const clientName = "testingkanban";
const isExistingClient = false;
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
  "I am logged in as Admin For Add Whatapp Number",
  { timeout: 180000 },
  async function () {
    await driver.get(
      "http://kanban-atpl-dev.s3-website.ap-south-1.amazonaws.com/login"
    );

    const selectEmail = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Email Address']")
      ),
      10000
    );
    const selectInput = await selectEmail.findElement(
      By.xpath("following-sibling::input")
    );
    await selectInput.sendKeys("admin@gmail.com");
    await driver.sleep(1000);

    // Enter Password

    const passwordLabel = await driver.wait(
      until.elementLocated(
        By.xpath("//label[normalize-space(text())='Password']")
      ),
      10000
    );

    const parentDiv = await passwordLabel.findElement(By.xpath(".."));
    const passwordInput = await parentDiv.findElement(
      By.xpath(".//input[@type='password']")
    );
    await passwordInput.sendKeys("admin123");
    await driver.sleep(1000);

    // click on Submit
    const submitButton = await driver.wait(
      until.elementLocated(
        By.xpath("//button[normalize-space(text())='Submit']")
      ),
      10000
    );

    await submitButton.click();
    await driver.sleep(3000);
  }
);

When("Click on Setting and Select ADD TO WHATSAPP", async function () {
  const gearIconDiv = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class, 'border-blue-400') and contains(@class, 'rounded-lg')]"
      )
    ),
    10000
  );

  await gearIconDiv.click();

  await driver.sleep(1000);
});

When("Select ADD To WHATSAPP", async function () {
  const addToWhatsAppButton = await driver.wait(
    until.elementLocated(By.xpath("//button[text()='Add to whatsapp']")),
    10000
  );
  await addToWhatsAppButton.click();
  await driver.sleep(1000);
});

When("Click on Sync Whats App", async function () {
  const syncButton = await driver.wait(
    until.elementLocated(By.xpath("//button[text()='Sync New WhatsApp']")),
    10000
  );
  await syncButton.click();
  await driver.sleep(1000);
});

When("Add Client Name", async function () {
  const clientName = "testingkanban";
  const clientNameInput = await driver.wait(
    until.elementLocated(By.xpath("//input[@placeholder='Enter Client Name']")),
    10000
  );
  await clientNameInput.clear();
  await clientNameInput.sendKeys(clientName);

  // Click Save
  const saveButton = await driver.wait(
    until.elementLocated(By.xpath("//button[text()='Save']")),
    10000
  );
  await saveButton.click();
  await driver.sleep(1000);

  let isMatch = false;

  try {
    const nameCell = await driver.wait(
      until.elementLocated(
        By.xpath(
          `//table[contains(@class,'min-w-full')]//tbody//tr//td[contains(text(),'${clientName}')]`
        )
      ),
      5000
    );

    const nameText = await nameCell.getText();
    isMatch = nameText.trim() === clientName;

    if (isMatch) {
      // Remove toast
      await driver.executeScript(`
        const toast = document.querySelector(".Toastify__toast-container");
        if (toast) toast.remove();
      `);

      // Close modal
      const closeButton = await driver.findElement(By.css(".btn-close"));
      await closeButton.click();
      await driver.sleep(5000)
    } else {
      await driver.sleep(5000)
      
      // Scan QR button inside name row
      const clickQr = await nameCell.findElement(
        By.xpath(".//following::button[text()='Scan QR']")
      );
      await clickQr.click();
      await driver.sleep(30000);
    }
  } catch (err) {
    console.log("Client not found in table. Showing alert.");
    await driver.executeScript("alert('Client not found!')");
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    await alert.accept();
  }

  await driver.sleep(2000);
});
