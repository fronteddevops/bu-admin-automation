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
  driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().maximize();
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});

Given("I am logged in For Task Assign", { timeout: 180000 }, async function () {
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
});

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
  await driver.sleep(3000);
});

When("First indexing Email Drag and Drop on To Do", async function () {
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

  const actions = driver.actions({ async: true });
  await actions
    .move({ origin: draggableEmail })
    .press()
    .pause(300)
    .move({ origin: todoSection })
    .release()
    .perform();

  await driver.sleep(5000);
});

When("Click on Deadline and select today", async function () {
  const todoDroptarget = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class,'droptarget') and .//span[normalize-space(text())='To Do']]"
      )
    ),
    10000
  );

  const deadlineButton = await todoDroptarget.findElement(
    By.xpath(
      ".//span[contains(@class,'deadline-btn') and normalize-space(text())='Deadline']"
    )
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'})",
    deadlineButton
  );
  await driver.sleep(300);
  await deadlineButton.click();
  await driver.sleep(3000);

  // Click on Today
  const todoDroptargets = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class,'droptarget') and .//span[normalize-space(text())='To Do']]"
      )
    ),
    10000
  );

  const todayButton = await todoDroptargets.findElement(
    By.css(".text-listdrop.daysof-week")
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'})",
    todayButton
  );
  await driver.sleep(300);
  await todayButton.click();
  await driver.sleep(10000);
});

When("Click on First indexing Email on To Do", async function () {
  const todoDroptarget = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//div[contains(@class,'droptarget') and .//span[normalize-space(text())='To Do']]"
      )
    ),
    10000
  );

  // Find the .inbox-Task-scroll inside the To Do droptarget
  const container = await todoDroptarget.findElement(
    By.css(".inbox-Task-scroll")
  );

  const firstTask = await container.findElement(By.css(".task-crat"));

  await driver.executeScript(
    "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });",
    firstTask
  );
  await driver.sleep(300);
  await firstTask.click();
  await driver.sleep(10000);
});

When("Click on Assign", async function () {
  const assignLink = await driver.wait(
    until.elementLocated(By.xpath("//a[normalize-space()='Assign...']")),
    10000
  );
  await assignLink.click();
  await driver.sleep(1000);

  // Click on Assigni
  const firstUser = await driver.wait(
    until.elementLocated(
      By.xpath("//ul[contains(@class, 'assign-box')]//li[1]")
    ),
    10000
  );
  await firstUser.click();
  await driver.sleep(10000);
});

When("Set Reminder Tomorrow", async function () {
  const reminderBtn = await driver.wait(
    until.elementLocated(By.xpath("//button[normalize-space()='Reminder...']")),
    10000
  );
  await reminderBtn.click();

  // Select Tomorrow
  const tomorrowOption = await driver.wait(
    until.elementLocated(
      By.xpath("//ul//li[.//span[contains(text(), 'Tomorrow')]]")
    ),
    10000
  );
  await tomorrowOption.click();
  await driver.sleep(10000);
});

When("Select My Day plan Tomorrow", async function () {
  const tomorrowBtn = await driver.wait(
    until.elementLocated(By.xpath("//button[contains(text(), 'Tomorrow, 8:00 AM')]")),
    10000
  );
  await tomorrowBtn.click();
    
  //click on tomorrow
  const tomorrowOption = await driver.wait(
    until.elementLocated(
      By.xpath("//ul//li[.//span[contains(text(), 'In two days')]]")
    ),
    10000
  );
  await tomorrowOption.click();
  // Click on Today
  });

// When("Click on Today", async function(){
//   const timeButton = await driver.wait(
//     until.elementLocated(By.xpath("//button[contains(text(), 'Today')]")),
//     10000
//   );
//   await timeButton.click();

//   const nextWeekOption = await driver.wait(
//     until.elementLocated(
//       By.xpath("//ul//li[.//span[contains(text(), 'Next week')]]")
//     ),
//     10000
//   );
//   await nextWeekOption.click();
// })

When("Clicks on Notes and Enter Notes", async function name() {
  const notesButton = await driver.wait(
    until.elementLocated(By.xpath("//button[normalize-space()='Notes (Shift-Enter for new line)...']")),
    10000
  );
  await notesButton.click();
  await driver.sleep(5000)

  const notesTextarea = await driver.wait(
    until.elementLocated(By.css("textarea[placeholder='Add your notes here...']")),
    10000
  );
  await notesTextarea.sendKeys("This is a test note.");
  await driver.sleep(10000)
  
    
})