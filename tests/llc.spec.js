import {test, expect} from '@playwright/test';

test("Playwright special locators",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    //Important thing
    await page.getByRole("button",{name :'Submit'}).click();
    //Important thing
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //Important thing
    await page.getByRole("Link",{name:'Shop'}).click();
    //Playwright scans the multiple elements and then filters out by text what we give.
    //Important thing. As we scan to the exact name and there is only one button
    //so no need to provide the name
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
})