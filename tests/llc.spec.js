import {test, expect} from '@playwright/test';

test("Playwright special locators",async({page})=>
{
    await page.locator("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
})