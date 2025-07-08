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
  "I am logged in as Admin For GmailReply",
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

Then("Select Email", async function () {
  const { By, until, Key } = require("selenium-webdriver");

  const dropdownTrigger = await driver.wait(
    until.elementLocated(
      By.xpath("//div[contains(@class,'dropdown-heading')]")
    ),
    10000
  );
  await dropdownTrigger.click();
  await driver.sleep(500);

  const searchInput = await driver.wait(
    until.elementLocated(By.css("input[type='text']")),
    10000
  );

  await driver.wait(until.elementIsVisible(searchInput), 5000);

  await searchInput.sendKeys("applatus.isha@gmail.com");
  await driver.sleep(3000);

  await searchInput.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(3000);
  await searchInput.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(3000);

  await searchInput.sendKeys(Key.ENTER);
  await driver.sleep(3000);

  await driver.sleep(10000);

  const allDraggableEmails = await driver.wait(
    until.elementsLocated(
      By.xpath("//div[@class='inbox-Mail']//div[@draggable='true']")
    ),
    10000
  );

  const firstEmail = allDraggableEmails[0];

  const todoSection = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class,'title-contents')]//span[normalize-space(text())='To Do']/ancestor::div[contains(@class,'drop-relative')]"
      )
    ),
    10000
  );

  //  From the "To Do" section, find its related drop button
  //   const dropTarget = await todoSection.findElement(By.css(".task.task-curve .add-task-button"));
  

  const draggableEmail = await driver.wait(
    until.elementLocated(
      By.xpath("(//div[@class='inbox-Mail']//div[@draggable='true'])[1]")
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    draggableEmail
  );
  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    todoSection
  );

  // Perform drag and drop
  const actions = driver.actions({ async: true });
  await actions
    .move({ origin: draggableEmail })
    .press()
    .pause(300)
    .move({ origin: todoSection })
    .release()
    .perform();

  await driver.sleep(5000);
  const firstTask = await driver.wait(
    until.elementLocated(
      By.xpath("(//div[contains(@class,'inbox-Task-scroll')]//div[@draggable='true'])[1]")
    ),
    10000
  );
  
  // 2. Click the task to open or activate it
  await firstTask.click();
  await driver.sleep(500); // Small wait to allow UI to respond
  
  // 3. Locate the "Deadline" span and click it
  const deadlineButton = await driver.wait(
    until.elementLocated(
      By.xpath("//span[normalize-space(text())='Deadline']")
    ),
    10000
  );
  
  await deadlineButton.click();
  await driver.sleep(500);
});
