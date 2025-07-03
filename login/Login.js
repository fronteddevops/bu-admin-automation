const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");
const os = require("os");

(async function Login(){
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.manage().window().maximize();
        await driver.get("http://192.168.29.67:5173/kanban");
        await driver.sleep(30000)

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








        
    } catch (error) {
        
    }

})()