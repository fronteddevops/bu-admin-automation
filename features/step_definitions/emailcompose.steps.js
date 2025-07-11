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
const fs = require("fs");
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

Given(
  "I am logged in as Admin For Gmail Compose",
  { timeout: 180000 },
  async function () {
    await driver.get(
      "http://kanban-atpl-dev.s3-website.ap-south-1.amazonaws.com/app"
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
  await driver.sleep(1000);
});

When("Click on Compose Email Icon", async function () {
  const composeIcon = await driver.wait(
    until.elementLocated(By.xpath("//span[@title='Compose']")),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
    composeIcon
  );
  await driver.sleep(300);
  await composeIcon.click();
  await driver.sleep(2000);
});

When("Enter Sender Email", async function () {
  const toInput = await driver.wait(
    until.elementLocated(By.id("recipients")),
    10000
  );

  // Click and clear the field (optional)
  await toInput.click();
  await toInput.clear();

  // Enter the email address
  await toInput.sendKeys("applatus.sandeepsingh@gmail.com");
  await driver.sleep(2000);
});

When("Enter Subject", async function () {
  const subjectInput = await driver.wait(
    until.elementLocated(By.id("subject")),
    10000
  );

  // Click and clear the field (optional)
  await subjectInput.click();
  await subjectInput.clear();

  await subjectInput.sendKeys("testing bu - admin");
  await driver.sleep(2000);
});

When("Select Template", async function () {
  // const label = await driver.wait(
  //   until.elementLocated(
  //     By.xpath("//label[normalize-space(text())='Template']")
  //   ),
  //   10000
  // );

  // const selectElement = await label.findElement(
  //   By.xpath("./following-sibling::select | ../select")
  // );

  // await selectElement.click();

  // await selectElement
  //   .findElement(By.xpath("./option[normalize-space(text())='Test_kanban']"))
  //   .click();
  // await driver.sleep(2000);
  const label = await driver.wait(
    until.elementLocated(
      By.xpath("//label[normalize-space(text())='Template']")
    ),
    10000
  );

  const selectElement = await label.findElement(
    By.xpath("./following-sibling::select | ../select")
  );

  // Click the dropdown to open (optional)
  await selectElement.click();

  // Select the first <option> (index 0)
  const firstOption = await selectElement.findElement(
    By.css("option:nth-child(2)")
  );
  await firstOption.click();

  await driver.sleep(2000);
});

When("Add Text in Email Body", async function () {
  // const editor = await driver.wait(
  //   until.elementLocated(
  //     By.css(".ck-editor__editable[contenteditable='true']")
  //   ),
  //   10000
  // );

  // await driver.executeScript(
  //   "arguments[0].scrollIntoView({block: 'center'});",
  //   editor
  // );
  // await driver.sleep(300);
  // await driver.executeScript("arguments[0].focus();", editor);
  // await driver.sleep(100);
  // await editor.sendKeys(Key.SPACE, "compose email");
  // await driver.sleep(10000)
  const editors = await driver.findElements(
    By.css("div[contenteditable='true'].ck-editor__editable")
  );

  // If more than 1, pick the visible one
  for (const ed of editors) {
    const displayed = await ed.isDisplayed();
    if (displayed) {
      await driver.executeScript(
        "arguments[0].scrollIntoView({block: 'center'});",
        ed
      );
      await driver.executeScript("arguments[0].focus();", ed);
      break;
    }
  }
  await driver.sleep(2000);
});

// When("Add File", async function () {
//   const attachLabel = await driver.wait(
//     until.elementLocated(By.css('label[data-tooltip-id="upload-tooltip"]')),
//     10000
//   );
//   const fileInput = await attachLabel.findElement(By.css('input[type="file"]'));

//   const downloadsFolder = path.join(os.homedir(), "Downloads");
//   const filePath = path.join(
//     downloadsFolder,
//     "istockphoto-1798864003-2048x2048.jpg"
//   );

//   await fileInput.sendKeys(filePath);

//   const fileCount = await driver.executeScript(
//     "return arguments[0].files.length;",
//     fileInput
//   );
//   console.log("Files selected:", fileCount);

//   await driver.sleep(2000);

//   const pageSource = await driver.getPageSource();
//   console.log(pageSource);

//   try {
//     await driver.wait(
//       until.elementLocated(By.css('[class*="file-preview"]')),
//       10000
//     );
//     console.log("Found a file preview element!");
//   } catch (e) {
//     console.log('No file preview element found with [class*="file-preview"]');
//   }

//   try {
//     await driver.wait(until.elementLocated(By.css("img")), 10000);
//     console.log("Found an <img> element!");
//   } catch (e) {
//     console.log("No <img> element found.");
//   }

//   await driver.sleep(5000);
// });

When("Add File", async function () {
  const downloadsFolder = path.join(os.homedir(), "Downloads");
  const filePath = path.join(downloadsFolder, "istockphoto-1798864003-2048x2048.jpg");

  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ File not found at: ${filePath}`);
  }

  const modal = await driver.wait(
    until.elementLocated(By.xpath("//div[contains(@class,'modal-header')]//div[text()='Compose Email']/ancestor::div[contains(@class,'modal')]")),
    10000
  );
  await driver.wait(until.elementIsVisible(modal), 5000);
  console.log("✅ Compose Email modal is open");

  const fileInput = await modal.findElement(By.css('input[type="file"]'));

  await fileInput.sendKeys(filePath);

  await driver.executeScript(`
    const input = arguments[0];
    const event = new Event('change', { bubbles: true });
    input.dispatchEvent(event);
  `, fileInput);

  const fileName = await driver.executeScript(
    "return arguments[0].files[0]?.name;",
    fileInput
  );
  console.log("📂 File selected in input:", fileName);

  let previewImg;
  try {
    // previewImg = await modal.findElement(By.css('img[alt="Preview 0"]'));
    previewImg = await modal.findElement(By.css('img.object-cover'));
    const imgSrc = await previewImg.getAttribute("src");
    console.log("🖼️ Preview image src:", imgSrc);

    if (imgSrc.startsWith("blob:")) {
      console.log("✅ Image preview loaded in modal!");
    } else {
      console.warn("⚠️ Image preview src is not a blob.");
    }
  } catch (e) {
    console.error("❌ Image preview not found in modal.");
  }

  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync("compose-email-preview.png", screenshot, "base64");
  console.log("📸 Screenshot saved as compose-email-preview.png");

  await driver.sleep(20000);
});

// When("Add File", async function () {
//   const downloadsFolder = path.join(os.homedir(), "Downloads");
//   const filePath = path.join(downloadsFolder, "istockphoto-1798864003-2048x2048.jpg");

//   if (!fs.existsSync(filePath)) {
//     throw new Error(`❌ File not found: ${filePath}`);
//   }

//   // 1. Wait for Compose Email modal
//   const modal = await driver.wait(
//     until.elementLocated(By.xpath("//div[contains(@class,'modal-header')]//div[text()='Compose Email']/ancestor::div[contains(@class,'modal')]")),
//     10000
//   );
//   await driver.wait(until.elementIsVisible(modal), 5000);
//   console.log("✅ Compose Email modal is visible");

//   // 2. Upload file
//   const fileInput = await modal.findElement(By.css('input[type="file"]'));
//   await fileInput.sendKeys(filePath);

//   // 3. Trigger React change
//   await driver.executeScript(`
//     const input = arguments[0];
//     const event = new Event('change', { bubbles: true });
//     input.dispatchEvent(event);
//   `, fileInput);

//   // 4. Confirm file selected
//   const fileName = await driver.executeScript(
//     "return arguments[0].files[0]?.name;",
//     fileInput
//   );
//   console.log("📂 Uploaded file:", fileName);

//   // ✅ 5. Wait for image preview in .email-file-preview
//   const previewImg = await driver.wait(
//     until.elementLocated(By.css(".email-file-preview img")),
//     10000
//   );

//   const imgSrc = await previewImg.getAttribute("src");
//   console.log("🖼️ Preview image src:", imgSrc);

//   if (imgSrc.startsWith("blob:")) {
//     console.log("✅ Image preview is a blob URL.");
//   } else {
//     console.warn("⚠️ Image preview is NOT a blob.");
//   }

//   // 6. Screenshot
//   const screenshot = await driver.takeScreenshot();
//   fs.writeFileSync("compose-email-preview.png", screenshot, "base64");
//   console.log("📸 Screenshot saved: compose-email-preview.png");

//   await driver.sleep(2000);
// });

When("click on Send Email", async function () {
  const sendButton = await driver.wait(
    until.elementLocated(
      By.xpath(
        "//button[contains(@class, 'bg-blue-600') and normalize-space(text())='Send']"
      )
    ),
    10000
  );

  await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    sendButton
  );
  await driver.sleep(300);
  await sendButton.click();
  await driver.sleep(100000);
});
