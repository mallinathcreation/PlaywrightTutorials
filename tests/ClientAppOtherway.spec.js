const { test, expect } = require('@playwright/test');



test.only('Client App Login Other Way', async ({ page }) => {

    const email = "mbasu@gmail.com"
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").type("Mbasu@123");
    await page.getByRole("button",{name: 'Login'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText: productName})
    .getByRole("button",{name: 'Add To Cart'}).click();

    //Important thing as if we give cart only then it will give two items
    //Add to Cart and Cat. So thats why we are using like this
    await page.getByRole("listitem").getByRole("button",{name: 'Cart'}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole("button",{name: 'Checkout'}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:'India'}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.getByRole("listitem").getByRole("button",{name: 'ORDERS'}).click();
    await page.locator(".table").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0; i< await rows.count(); i++){
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderID)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();

});