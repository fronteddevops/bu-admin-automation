const { Builder, By, until } = require('selenium-webdriver');
const { Given, When, Then, After, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const path = require('path');
const os = require('os');
const chromedriver = require('chromedriver');
let driver;
let selectedGroup = "Admin Group4561";

setDefaultTimeout(120 * 1000); 

Before( async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();
  
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});

Given('I am logged in as admin', { timeout: 180000 }, async function () {
  await driver.get('http://192.168.29.67:5173/kanban');
  const emailInput = await driver.wait(until.elementLocated(By.css("input[name='email'][placeholder='Email']")), 500);
  await driver.wait(until.elementIsVisible(emailInput), 10000);
  await emailInput.click();
  await emailInput.sendKeys("admin@gmail.com");
  await driver.sleep(1000);
  const passwordInput = await driver.wait(until.elementLocated(By.css("input[name='password'][placeholder='Password']")), 10000);
  await driver.wait(until.elementIsVisible(passwordInput), 5000);
  await passwordInput.click();
  await passwordInput.sendKeys("admin123");
  await driver.sleep(1000);
  const signInBtn = await driver.wait(until.elementLocated(By.id("kt_sign_in_submit")), 10000);
  await driver.wait(until.elementIsVisible(signInBtn), 5000);
  await driver.wait(until.elementIsEnabled(signInBtn), 5000);
  await signInBtn.click();
  await driver.sleep(2000);
});

When('I navigate to the Users section in Settings', async function () {
  const settingsMenu = await driver.wait(until.elementLocated(By.xpath("//span[normalize-space(text())='Settings']/ancestor::div[contains(@class, 'menu-accordian-list')]")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", settingsMenu);
  await driver.sleep(300);
  await settingsMenu.click();
  await driver.executeScript("window.scrollBy(0, 4000);");
  await driver.sleep(500);
  const usersMenu = await driver.wait(until.elementLocated(By.xpath("//span[normalize-space(text())='Users']/parent::div[contains(@class, 'menu-accordian-list')]")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", usersMenu);
  await driver.sleep(300);
  await usersMenu.click();
});

When('I create a new group {string} with permissions', async function (groupName) {
  const userPrivilegeButton = await driver.wait(until.elementLocated(By.xpath("//button[@type='button' and contains(@class, 'primary-btn') and normalize-space()='User/Privilege']")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", userPrivilegeButton);
  await driver.sleep(300);
  await userPrivilegeButton.click();
  const addGroupButton = await driver.wait(until.elementLocated(By.xpath("//button[@type='button' and contains(@class, 'primary-btn') and normalize-space()='Add Group']")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", addGroupButton);
  await driver.sleep(300);
  await addGroupButton.click();
  const groupLabel = await driver.wait(until.elementLocated(By.xpath("//label[normalize-space()='Group']")), 10000);
  const groupInput = await groupLabel.findElement(By.xpath("./following-sibling::input"));
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", groupInput);
  await driver.sleep(300);
  await groupInput.clear();
  await groupInput.sendKeys(selectedGroup);
  // Permissions selection (simplified for brevity)
  async function selectPermission(sectionText, optionText) {
    const section = await driver.wait(until.elementLocated(By.xpath(`//p[normalize-space()='${sectionText}']/ancestor::div[contains(@class, 'd-flex')]`)), 10000);
    const radioLabel = await section.findElement(By.xpath(`.//label[.//span[normalize-space()='${optionText}']]`));
    const radioInput = await radioLabel.findElement(By.css("input[type='radio']"));
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", radioInput);
    await driver.sleep(300);
    await driver.executeScript("arguments[0].click();", radioInput);
  }
  await selectPermission("trip", "Can view");
  await selectPermission("experience", "Can create");
  await selectPermission("group-user", "Can create");
  await selectPermission("location", "Can view");
  await selectPermission("users", "Not allowed");
  await selectPermission("cancellationpolicy", "Can view");
  await selectPermission("faq", "Can view");
  await selectPermission("roomtype", "Can create");
  await selectPermission("airport", "Can create");
  await selectPermission("amenity", "Can view");
  await selectPermission("general", "Not allowed");
  await selectPermission("places", "Can view");
  await selectPermission("bookingavailability", "Can view");
  await selectPermission("triprequest", "Can create");
  await selectPermission("agerange", "Can create");
  await selectPermission("flight", "Can view");
  await selectPermission("flight-list", "Not allowed");
  await selectPermission("rental", "Can view");
  await selectPermission("rental-list", "Can view");
  await selectPermission("transfer", "Can create");
  await selectPermission("transfer-list", "Can create");
  await selectPermission("tripboard", "Can view");
  await selectPermission("carrental", "Not allowed");
  await selectPermission("carrentalsearch", "Can view");
  await selectPermission("flightssearch", "Can view");
  await selectPermission("carDetails/:id", "Can create");
  await selectPermission("carDetails", "Can create");
  await selectPermission("add-suppliers-list", "Can view");
  await selectPermission("accommodation", "Not allowed");
  await selectPermission("accommodation-list", "Can view");
  await selectPermission("kanban", "Can view");
  await driver.sleep(5000);
  await selectPermission("day-tour-list", "Can view");
  await selectPermission("create-booking", "Can view");
  await selectPermission("dailyDepartures", "Can view");
  await selectPermission("bookingDesk", "Not allowed");
  await selectPermission("salesFeed", "Can view");
  await selectPermission("booking-for-payouts", "Can create");
  await selectPermission("salesFeed/:id", "Can view");
  await selectPermission("payment", "Can view");
  await selectPermission("product", "Can view");
  await selectPermission("product/:id", "Not allowed");
  await selectPermission("rental/:id", "Can view");
  await selectPermission("transfer/:id", "Can create");
  await selectPermission("flight/:id", "Can view");
  await selectPermission("accomodation/:id", "Can view");
  await selectPermission("tripboard/:id", "Can view");
  await driver.sleep(2000);
  const saveButtonOption = await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'modal-success-button') and normalize-space()='save']")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", saveButtonOption);
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", saveButtonOption);
  await driver.sleep(1000);
  const backButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'primary-btn') and normalize-space()='Back']")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", backButton);
  await driver.sleep(300);
  await driver.executeScript("arguments[0].click();", backButton);
});

When('I add a new user {string} with email {string} and password {string} to the group', async function (name, email, password) {
  const addUserButton = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space(text())='Add User' and contains(@class, 'primary-btn')]")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", addUserButton);
  await driver.sleep(300);
  await addUserButton.click();
  // Upload profile image
  const downloadsFolderDrag = path.join(os.homedir(), "Downloads");
  const imagePaths = path.join(downloadsFolderDrag, "istockphoto-1798864003-2048x2048.jpg");
  const profileImageSection = await driver.wait(until.elementLocated(By.xpath("//label[normalize-space(text())='Profile Image']/parent::div")), 10000);
  const fileInput = await profileImageSection.findElement(By.xpath(".//input[@type='file']"));
  await fileInput.sendKeys(imagePaths);
  await driver.sleep(1000);
  // Select Group
  const groupLabels = await driver.wait(until.elementLocated(By.xpath("//label[normalize-space()='Groups']")), 10000);
  const groupCombobox = await groupLabels.findElement(By.xpath("./following-sibling::div//div[@role='combobox']"));
  await driver.sleep(300);
  await groupCombobox.click();
  await driver.sleep(1000);
  const adminGroupOption = await driver.wait(until.elementLocated(By.xpath(`//span[text()='${selectedGroup}']`)), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", adminGroupOption);
  await driver.sleep(300);
  await adminGroupOption.click();
  // Enter Name
  const nameLabel = await driver.wait(until.elementLocated(By.xpath("//label[normalize-space()='Name']")), 10000);
  const nameInput = await nameLabel.findElement(By.xpath("./following-sibling::input"));
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", nameInput);
  await driver.sleep(300);
  await nameInput.clear();
  await nameInput.sendKeys(name);
  // Enter Email
  const emailLabel = await driver.wait(until.elementLocated(By.xpath("//label[normalize-space()='Email']")), 10000);
  const emailInputuser = await emailLabel.findElement(By.xpath("./following-sibling::input"));
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", emailInputuser);
  await driver.sleep(300);
  await emailInputuser.clear();
  await emailInputuser.sendKeys(email);
  // Enter Password
  const passwordInputuser = await driver.wait(until.elementLocated(By.xpath("//input[@type='password' and @placeholder='Password']")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", passwordInputuser);
  await driver.sleep(300);
  await passwordInputuser.clear();
  await passwordInputuser.sendKeys(password);
  // Save
  const saveButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'modal-success-button') and normalize-space()='Save']")), 10000);
  await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", saveButton);
  await driver.sleep(300);
  await saveButton.click();
  await driver.sleep(1000);
  // const closeButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'modal-cancel-button') and normalize-space()='Close']")), 10000);
  // await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", closeButton);
  // await driver.sleep(300);
  // await closeButton.click();
});

Then('the user should be added successfully', async function () {
  
  await driver.sleep(2000);
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
}); 