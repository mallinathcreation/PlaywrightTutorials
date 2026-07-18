const { test, expect } = require('@playwright/test');

test("Popup Validations", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#confirmbtn").click();

    //to handle java script alerts .In playwright it is called dialogs.
    page.on("dialog", dialog => dialog.accept()); //to accept the alert
    // page.on("dialog",dialog=>dialog.dismiss()); // to dismiss the alert

    //to hover on element
    await page.locator("#mousehover").hover();

    //handle frames
    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("li a[href='lifetime-access']:visible").click();
    const text = await framespage.locator("div.text h2").textContent();
    console.log(text.split(" ")[1].trim());

});

test("Screenshot and Visual Comparision", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    //to take screenshot
    
    await page.locator("#displayed-text").screenshot({path:"partialscreenshot.png"});
    

    await page.locator("#hide-textbox").click();
    await page.screenshot({path:"screenshot.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#confirmbtn").click();

    //to handle java script alerts .In playwright it is called dialogs.
    page.on("dialog", dialog => dialog.accept()); //to accept the alert
    // page.on("dialog",dialog=>dialog.dismiss()); // to dismiss the alert

    //to hover on element
    await page.locator("#mousehover").hover();

    //handle frames
    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("li a[href='lifetime-access']:visible").click();
    const text = await framespage.locator("div.text h2").textContent();
    console.log(text.split(" ")[1].trim());

});


//Visual Testing --> take a screenshot --> store it in project 
//Now every day we will take screenshot and then it will compare with screenshot of
//yesterday to today it will compare.

test("Visual Comparision", async ({ page }) => {

    await page.goto("https://www.flightaware.com/");
    await expect(await page.screenshot()).toMatchSnapshot("landing.png");
    

});