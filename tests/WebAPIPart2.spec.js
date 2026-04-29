const { test, expect } = require('@playwright/test');

let webcontext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("#userEmail").fill("mbasu@gmail.com");
    await page.locator("#userPassword").type("Mbasu@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    //to get the storage state from browser 
    await context.storageState({ path: 'state.json' });
    //in the noew browser we are passing the storage state which got created.
    webcontext = await browser.newContext({ storageState: 'state.json' });

});

test('Client App Login', async () => {

    const email = "mbasu@gmail.com";
    const productName = "ZARA COAT 3";
    const page = await webcontext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const title = await page.locator(".card-body b").allTextContents();
    // console.log(title);

    //Zara Coat 3
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    //checks text on an element which has h3 tag name. IsVisible() method don't have auto wait.
    const bool = await page.locator("h3:has-text('" + productName + "')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    //fill is not suitable as fill enters whole  buch of text, 
    // so in this case if whole bunch is used then 
    // it will not provide the suggestions. It has recently used pressSequenntially()
    await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(await page.locator(".mt-5 [type='text']").first()).toHaveText("mbasu@gmail.com");
    await page.locator(".action__submit").click();
    await expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("li [routerlink*='myorders']").click();
    await page.locator(".table").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(orderID.includes(orderIdDetails)).toBeTruthy();

});

test('Test Case 2 ', async () => {

    const email = ""
    const productName = "ZARA COAT 3";
    const page = await webcontext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title);
});