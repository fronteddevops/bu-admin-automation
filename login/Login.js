const { Builder, By, Key, until } = require("selenium-webdriver");
const path = require("path");
const os = require("os");

(async function Login(){
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.manage().window().maximize();
        await driver.get("http://192.168.29.67:5173/kanban");

        const emaiinput = await driver.wait(until.elementLocated(By.css("input[name='email'][placeholder='Email']")),10000)
               await driver.wait(until.elementIsVisible(emaiinput),5000)
        await emaiinput.click()
        await emaiinput.sendKeys("admin@gmail.com")
        await driver.sleep(2000)

        // Enter Password 
        const passwordinput = await driver.wait(until.elementLocated(By.css("input[name='password'][placeholder='Password']")))
        await driver.wait(until.elementIsVisible(passwordinput),5000)
        await passwordinput.click()
        await passwordinput.sendKeys("admin123")

        const loc = await driver.findElement(By.className('fa-eye'));
        await driver.wait(until.elementIsVisible(loc),5000)
        await driver.sleep(1000)
        await loc.click()
        await driver.sleep(500)

        const singinbutton = await driver.findElement(By.id('kt_sign_in_submit'));
        await driver.wait(until.elementIsVisible(singinbutton),5000)
        await singinbutton.click()

        // const settings = await driver.findElement(By.partialLinkText('Official Page'));
        // const settings   = await driver.elementLocated(until.findElement(By.partialLinkText('Settings')),1000)
        // await driver.wait(until.elementIsVisible(settings),5000)
        // await settings.click()

        const setting = await driver.wait(until.elementLocated(By.xpath("//span[contains(@class, 'menu-title') and normalize-space(text())='Settings']")))
        await setting.click()
        const settings = await driver.wait(until.elementLocated(By.xpath("//span[contains(@class, 'menu-title') and normalize-space(text())='Age Range']")))
        await settings.click()
        const testing  = await driver.wait(until.elementLocated(By.xpath("//span[contains(@class, 'menu-title') and normalize-space(text())='Trip Request']")))
        const search = await driver.wait(until.elementLocated(By.css('.triplist-search-field-box')),1000)
        console.log("searchddddddddddddfffffffffff")
        await driver.sleep(1000)
        const search1  = await search.findElement(By.css("input[name='search'][placeholder='Search...']"))
        await driver.wait(until.elementIsVisible(search1),5000)
        await search1.click()
        await search1.sendKeys("30")








        
    } catch (error) {
        
    }

})()