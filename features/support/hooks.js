const playwright = require('@playwright/test');
const { Before,After,BeforeStep,AfterStep,status } = require('@cucumber/cucumber');

Before(async function () {
    console.log("i am first");
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
});

After(async function () {
    console.log("Closing the browser");
});

BeforeStep(async function () {
    console.log("Before Step");
});

AfterStep(async function ({ result }) {
    if (result.status === "FAILED") {
        await this.page.screenshot({ path: 'screenshot1.png' })
    }
});
