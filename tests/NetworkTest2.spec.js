const { test, expect } = require('@playwright/test');


test("Security Test Intercept", async ({ page }) => {

    //login and reach orders page
    const email = "mbasu@gmail.com"
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Mbasu@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("li [routerlink*='myorders']").click();



    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async (route) =>
            //continue is used to intercept headers.
            route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=131651566516fdsfdsfds" })

    );
    //css using text.
    await page.locator("button:has-text('View')").first().click();
    await page.pause();


});